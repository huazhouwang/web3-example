import TransactionView, { ActionBtnState } from './view';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { prettify } from '../../utils';
import {
  serializeTransaction,
  deserializeTransaction,
  ExplorerUrlsForTx,
  DEFAULT_TX_EXPLORER,
} from './helper';
import { addHexPrefix } from 'ethereumjs-util';
import { useInjectedWeb3Activate } from '../../hooks';
import { useWeb3React } from '@web3-react/core';
import { createBackupProvider } from '../../connector';
import {
  JsonRpcProvider,
  Network,
  Web3Provider,
} from '@ethersproject/providers';
import { CircularProgress } from '@material-ui/core';

const DEFAULT_ACTION_BTN_STATE: ActionBtnState = {
  disabled: true,
  children: 'Pending',
};

interface TxSnapshot {
  txid?: string;
  chainId?: number;
  signed?: boolean;
  sender?: string;
  payload: object;
}

const isValidUrl = (value: string): boolean => {
  let url: URL | undefined;
  try {
    url = new URL(value);
  } catch {}

  return url?.protocol === 'http:' || url?.protocol === 'https:';
};

const renderActionBtnState = async (
  provider: any,
  { signed, txid, chainId, payload }: TxSnapshot,
  onTransactionSigned: (tx: any) => void,
): Promise<ActionBtnState> => {
  let btnState: ActionBtnState | undefined = undefined;
  const network: Network = await provider.getNetwork();

  if (signed) {
    if (chainId !== network.chainId) {
      btnState = {
        disabled: true,
        children: 'ChainId Mismatched',
      };
    } else if (txid) {
      const tx = await provider.send('eth_getTransactionByHash', [txid]);
      console.log('fetch tx: ', tx);
      if (typeof tx === 'object' && tx !== null && tx.hash === txid) {
        btnState = {
          disabled: false,
          children: 'Transaction Found!',
          onClick: () =>
            window.open(
              (
                ExplorerUrlsForTx[chainId as number] || DEFAULT_TX_EXPLORER
              ).replace('{0}', txid as string),
            ),
        };
      }
    }

    if (!btnState) {
      btnState = {
        disabled: false,
        children: 'Broadcast',
        onClick: () =>
          provider.send('eth_sendRawTransaction', [
            serializeTransaction(payload),
          ]),
      };
    }
  } else if (provider instanceof Web3Provider) {
    btnState = {
      disabled: false,
      children: 'Sign & Broadcast',
      onClick: () =>
        provider
          .getSigner()
          .sendTransaction(
            Object.assign(payload, {
              chainId: network.chainId,
            }),
          )
          .then((tx) =>
            onTransactionSigned(
              Object.assign(tx, { chainId: network.chainId }),
            ),
          ),
    };
  }

  return btnState || DEFAULT_ACTION_BTN_STATE;
};

const Transaction = () => {
  const [jsonTransactionValue, setJsonTransactionValue] = useState<string>('');
  const [jsonTransactionHelperText, setJsonTransactionHelperText] = useState<
    string | undefined
  >();
  const [rawTransactionValue, setRawTransactionValue] = useState<string>('');
  const [rawTransactionHelperText, setRawTransactionHelperText] = useState<
    string | undefined
  >();
  const [txSnapshot, setTxSnapshot] = useState<undefined | TxSnapshot>();

  const [nodeSelectedIndex, setNodeSelectedIndex] = useState<number>(0);
  const { active: isWalletInjected, library: injectedProvider } =
    useWeb3React();
  const [isAutoConnectWallet, doActivateInjected] = useInjectedWeb3Activate();
  const [customNodeValue, setCustomNodeValue] = useState<string>('');
  const provider = useMemo((): any | undefined => {
    if (nodeSelectedIndex === 0) {
      return createBackupProvider();
    } else if (nodeSelectedIndex === 1) {
      return injectedProvider;
    } else if (nodeSelectedIndex === 2 && isValidUrl(customNodeValue)) {
      return new JsonRpcProvider({ url: customNodeValue });
    }
  }, [nodeSelectedIndex, injectedProvider, customNodeValue]);

  const [actionBtnState, setActionBtnState] = useState<ActionBtnState>(
    DEFAULT_ACTION_BTN_STATE,
  );

  const updateTransaction = async (
    value: string,
    source: 'json_tx' | 'raw_tx',
  ) => {
    console.log('updateTransaction: ', value);
    let rawTransaction: string | undefined;

    if (source === 'raw_tx') {
      rawTransaction = addHexPrefix(value.trim());
    } else if (value) {
      const maybe_transaction = JSON.parse(value);
      rawTransaction = serializeTransaction(maybe_transaction);
    }

    if (!rawTransaction) {
      setTxSnapshot(undefined);
      return;
    }

    const jsonTransaction = deserializeTransaction(rawTransaction);
    const txid = jsonTransaction.hash;
    const senderAddress = jsonTransaction.from;

    txid && delete jsonTransaction.hash;
    senderAddress && delete jsonTransaction.from;

    const txSnapshot = {
      txid,
      chainId: jsonTransaction.chainId,
      signed: Boolean(
        jsonTransaction.r && jsonTransaction.s && jsonTransaction.v,
      ),
      sender: senderAddress,
      payload: jsonTransaction,
    };

    setRawTransactionHelperText(undefined);
    setRawTransactionValue(rawTransaction);
    setJsonTransactionHelperText(undefined);
    setJsonTransactionValue(prettify(jsonTransaction, 'json'));
    setTxSnapshot(txSnapshot);
  };

  const onTransactionEditorChange = useCallback(
    (value: string) => {
      if (value !== jsonTransactionValue) {
        updateTransaction(value, 'json_tx').catch((e: Error) => {
          console.error(e);
          try {
            value = prettify(value, 'json');
          } catch {}
          setJsonTransactionValue(value);
          setJsonTransactionHelperText(e?.message);
        });
      } else if (!value) {
        setJsonTransactionValue(value);
        setJsonTransactionHelperText(undefined);
      }
    },
    [jsonTransactionValue],
  );

  const onRawTransactionInputChange = (value: string) => {
    if (value) {
      updateTransaction(value, 'raw_tx').catch((e: Error) => {
        console.error(e);
        setRawTransactionHelperText(e?.message);
        setRawTransactionValue(value);
      });
    } else {
      setRawTransactionValue(value);
      setRawTransactionHelperText(undefined);
    }
  };

  useEffect(() => {
    let cancelled: boolean = false;

    console.log('useEffect: ', provider, txSnapshot);
    if (typeof provider !== 'undefined' && typeof txSnapshot !== 'undefined') {
      setActionBtnState({
        disabled: false,
        children: <CircularProgress color={'inherit'} size={24} />,
      });
      renderActionBtnState(
        provider,
        txSnapshot,
        (tx) => !cancelled && onTransactionEditorChange(JSON.stringify(tx)),
      )
        .then((value) => !cancelled && setActionBtnState(() => value))
        .catch(console.error);
    } else {
      setActionBtnState(DEFAULT_ACTION_BTN_STATE);
    }

    return () => {
      cancelled = true;
    };
  }, [provider, txSnapshot, onTransactionEditorChange]);

  useEffect(() => {
    if (isAutoConnectWallet) {
      setNodeSelectedIndex(1);
    }
  }, [isAutoConnectWallet]);

  return (
    <TransactionView
      rawTransactionHelperText={rawTransactionHelperText}
      rawTransactionValue={rawTransactionValue}
      onRawTransactionInputChange={onRawTransactionInputChange}
      jsonTransactionHelperText={jsonTransactionHelperText}
      jsonTransactionValue={jsonTransactionValue}
      onJsonTransactionInputChange={onTransactionEditorChange}
      txidValue={txSnapshot?.txid || ''}
      senderAddressValue={txSnapshot?.sender || ''}
      nodeSelectedIndex={nodeSelectedIndex}
      onNodeSelect={setNodeSelectedIndex}
      isWalletInjected={isWalletInjected}
      injectWallet={doActivateInjected}
      customNodeValue={customNodeValue}
      onCustomNodeValueChange={setCustomNodeValue}
      actionBtnState={actionBtnState}
    />
  );
};

export default Transaction;
