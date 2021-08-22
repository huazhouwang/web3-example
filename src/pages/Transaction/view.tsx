import { Column, Row, SizedBox } from '../../components/basic';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PagePaper from '../../components/PagePaper';
import Editor from '../../components/Editor';
import LabelText from '../../components/LabelText';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ExpandableHelperText from '../../components/ExpandableHelperText';
import MultiActionsSelector from '../../components/MultiActionsSelector';

const DEMO_TRANSACTION_JSON = `
// Input json format transaction here like this:
{
  "nonce": 0,
  "gasPrice": "0x0df8475800",
  "gasLimit": "0x0186a0",
  "to": "0x3535353535353535353535353535353535353535",
  "value": "0x64",
  "data": "0x",
  "chainId": 0,
  "v": 27,
  "r": "0x82de9950cc5aac0dca7210cb4b77320ac9e844717d39b1781e9d941d920a1206",
  "s": "0x1da497b3c134f50b2fce514d66e20c5e43f9615f097395a5527041d14860a52f"
}
`;
const DEMO_RAW_TRANSACTION = `
// or hex string raw transaction like this:
0xf86580850df8475800830186a094353535353535353535353535353535353535353564801ba082de9950cc5aac0dca7210cb4b77320ac9e844717d39b1781e9d941d920a1206a01da497b3c134f50b2fce514d66e20c5e43f9615f097395a5527041d14860a52f
`;

const useStyle = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    '& > *': {
      width: '100%',
    },
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    '& > *': {
      marginBottom: '8px',
    },
  },
  nodeInput: {
    height: '40px',
    borderColor: 'transparent',
    borderRadius: 0,
  },
  actionBtn: {
    marginLeft: '16px',
  },
}));

export interface ActionBtnState {
  children: JSX.Element | string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface TransactionViewProps {
  rawTransactionValue: string;
  onRawTransactionInputChange: (value: string) => void;
  rawTransactionHelperText?: string;

  jsonTransactionHelperText?: string;
  jsonTransactionValue: string;
  onJsonTransactionInputChange: (value: string) => void;

  txidValue: string;
  senderAddressValue: string;

  nodeSelectedIndex: number;
  onNodeSelect: (index: number) => void;
  isWalletInjected: boolean;
  chainIdOnEnv?: number;
  injectWallet: () => void;
  customNodeValue: string;
  onCustomNodeValueChange: (value: string) => void;
  actionBtnState: ActionBtnState;
}

const TransactionView = ({
  rawTransactionHelperText,
  rawTransactionValue,
  onRawTransactionInputChange,
  jsonTransactionHelperText,
  jsonTransactionValue,
  onJsonTransactionInputChange,
  txidValue,
  senderAddressValue,
  nodeSelectedIndex,
  onNodeSelect,
  isWalletInjected,
  injectWallet,
  customNodeValue,
  onCustomNodeValueChange,
  actionBtnState,
}: TransactionViewProps) => {
  const classes = useStyle();

  return (
    <PagePaper>
      <Column className={classes.container}>
        <Typography component={'h1'} variant={'h4'} align={'center'}>
          Transaction
        </Typography>

        <SizedBox height={32} />

        <Editor
          name={'transaction_editor'}
          placeholder={DEMO_TRANSACTION_JSON}
          mode={'json'}
          theme={'tomorrow_night_eighties'}
          value={jsonTransactionValue}
          onChange={onJsonTransactionInputChange}
          aria-describedby="transaction_editor_helper_text"
        />
        {jsonTransactionHelperText && (
          <ExpandableHelperText value={jsonTransactionHelperText} />
        )}

        <SizedBox height={3} />
        <SwapVertIcon color={'disabled'} />
        <SizedBox height={3} />

        <TextField
          error={!!rawTransactionHelperText}
          multiline
          maxRows={5}
          variant={'outlined'}
          label={
            rawTransactionValue && rawTransactionValue.length > 0
              ? 'Raw Transaction'
              : undefined
          }
          placeholder={DEMO_RAW_TRANSACTION}
          value={rawTransactionValue}
          onChange={(e) => onRawTransactionInputChange(e.target.value)}
        />
        {rawTransactionHelperText && (
          <ExpandableHelperText value={rawTransactionHelperText} />
        )}

        <SizedBox height={16} />
        <LabelText
          id={'txid'}
          FormHelperTextProps={{ variant: 'standard' }}
          value={txidValue}
          label={'Txid'}
        />
        <SizedBox height={8} />
        <LabelText
          id={'sender_address'}
          value={senderAddressValue}
          label={'Sender Address'}
        />
        <SizedBox height={16} />

        <Row className={classes.bottomContainer}>
          <MultiActionsSelector
            selectedIndex={nodeSelectedIndex}
            onActionSelect={(action, index) => onNodeSelect(index)}
            actions={[
              {
                label: 'Default ETH Mainnet',
                action: <Button>ETH Mainnet</Button>,
              },
              {
                label: 'Connect Wallet',
                action: (
                  <Button onClick={injectWallet}>
                    {isWalletInjected ? 'Connected' : 'Connect Wallet'}
                  </Button>
                ),
              },
              {
                label: 'Custom',
                action: (
                  <TextField
                    variant={'outlined'}
                    value={customNodeValue}
                    placeholder={'https://my_rpc_node.com'}
                    onChange={(e) => onCustomNodeValueChange(e.target.value)}
                    InputProps={{
                      className: classes.nodeInput,
                    }}
                  />
                ),
              },
            ]}
            groupProps={{
              variant: 'contained',
              color: 'primary',
            }}
          />
          <Button
            className={classes.actionBtn}
            variant={'contained'}
            color={'secondary'}
            {...actionBtnState}
          />
        </Row>
      </Column>
    </PagePaper>
  );
};

export default TransactionView;
