import {
  serialize,
  parse,
  Transaction,
  UnsignedTransaction,
} from '@ethersproject/transactions';
import { Signature } from '@ethersproject/bytes/src.ts/index';
import { addHexPrefix } from 'ethereumjs-util';
import { BigNumber } from '@ethersproject/bignumber';

const normalizedTransactionKeys: { [key: string]: string } = {
  chain_id: 'chainId',
  gas_limit: 'gasLimit',
  gas: 'gasLimit',
  gas_price: 'gasPrice',
  access_list: 'accessList',
  max_priority_fee_per_gas: 'maxPriorityFeePerGas',
  max_fee_per_gas: 'maxFeePerGas',
  input: 'data',
};

const asHexNumber = (value: number | string | undefined): string =>
  typeof value === 'undefined'
    ? '0x00'
    : BigNumber.from(
        typeof value === 'number' ? value.toString() : value,
      ).toHexString();

const asNumber = (value: number | string | undefined): number =>
  parseInt(asHexNumber(value), 16);

const normalizedTransactionValues: {
  [key: string]: (value: any) => any;
} = {
  hash: addHexPrefix,
  from: addHexPrefix,
  to: addHexPrefix,
  nonce: asNumber,
  gasLimit: (value) => asHexNumber(Math.max(21000, asNumber(value))),
  gasPrice: asHexNumber,
  data: addHexPrefix,
  value: asHexNumber,
  chainId: asNumber,
  type: asNumber,
  maxPriorityFeePerGas: asHexNumber,
  maxFeePerGas: asHexNumber,
  r: addHexPrefix,
  s: addHexPrefix,
  v: asNumber,
};

const allowedUnsignedTransactionKeys: Array<string> = [
  'to',
  'nonce',
  'gasLimit',
  'gasPrice',
  'data',
  'value',
  'chainId',
  'type',
  'accessList',
  'maxPriorityFeePerGas',
  'maxFeePerGas',
];

const allowedSignatureKeys: Array<string> = ['r', 's', 'v'];

const allowedTransactionKeys: Array<string> = [
  ...allowedUnsignedTransactionKeys,
  ...allowedSignatureKeys,
  'hash',
  'from',
];

const isMeaninglessValue = (value: any) =>
  typeof value === 'undefined' ||
  value === null ||
  (typeof value === 'string' && value.length === 0);

const normalizedTransaction = (maybe_transaction: object): Transaction => {
  const transaction = Object.fromEntries(
    Object.entries(maybe_transaction)
      .filter(([_, value]) => !isMeaninglessValue(value))
      .map(([key, value]): [string, any] => [
        key in normalizedTransactionKeys ? normalizedTransactionKeys[key] : key,
        key in normalizedTransactionValues
          ? normalizedTransactionValues[key](value)
          : value,
      ])
      .filter(([key, _]) => allowedTransactionKeys.includes(key)),
  );
  return transaction as Transaction;
};

const exportSignature = (transaction: Transaction): Signature | undefined => {
  let signature: Signature | undefined = Object.fromEntries(
    Object.entries(transaction).filter(([key, _]) =>
      allowedSignatureKeys.includes(key),
    ),
  ) as Signature;

  if (Object.keys(signature).length !== allowedSignatureKeys.length) {
    signature = undefined;
  }
  return signature;
};

export const serializeTransaction = (
  maybeTransaction: object,
): string | undefined => {
  const transaction = normalizedTransaction(maybeTransaction);
  const signature: Signature | undefined = exportSignature(transaction);

  const unSignedTransaction = Object.fromEntries(
    Object.entries(transaction).filter(([key, _]) =>
      allowedUnsignedTransactionKeys.includes(key),
    ),
  ) as UnsignedTransaction;

  return serialize(unSignedTransaction, signature);
};

export const deserializeTransaction = (rawTransaction: string) =>
  normalizedTransaction(parse(rawTransaction));

export const ExplorerUrlsForTx: { [key: number]: string } = {
  1: 'https://etherscan.io/tx/{0}',
  3: 'https://ropsten.etherscan.io/tx/{0}',
  56: 'https://bscscan.com/tx/{0}',
  97: 'https://testnet.bscscan.com/tx/{0}',
  128: 'https://hecoinfo.com/tx/{0}',
  256: 'https://testnet.hecoinfo.com/{0}',
};

export const DEFAULT_TX_EXPLORER = 'https://blockscan.com/tx/{0}';
