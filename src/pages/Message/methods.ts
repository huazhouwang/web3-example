import {
  easyCheckLegacyEIP712Struct,
  easyCheckMessageHash,
  easyCheckStandardEIP712Struct,
} from './helper';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import * as ethUtil from 'ethereumjs-util';
import * as signUtil from 'eth-sig-util';

export interface MessageSignMethod {
  name: string;
  cases: Array<{ name: string; value: string }>;
  preferJsonStringMessage?: boolean;
  checkIsTargetMessage: (message: string) => boolean;
  hashMessage: (message: string) => Promise<string>;
  signMessage: (
    web3: Web3ReactContextInterface,
    message: string,
  ) => Promise<string>;
}

const DEMO_TYPED_DATA_01 =
  '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallet","type":"address"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person"},{"name":"contents","type":"string"}]},"primaryType":"Mail","domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"message":{"from":{"name":"Cow","wallet":"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},"to":{"name":"Bob","wallet":"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},"contents":"Hello, Bob!"}}';
const DEMO_TYPED_DATA_02 =
  '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallet","type":"address"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person"},{"name":"contents","type":"string"},{"name":"payload","type":"bytes"}]},"primaryType":"Mail","domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"message":{"from":{"name":"Cow","wallet":"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},"to":{"name":"Bob","wallet":"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},"contents":"Hello, Bob!","payload":"0x25192142931f380985072cdd991e37f65cf8253ba7a0e675b54163a1d133b8ca"}}';
const DEMO_TYPED_DATA_03 =
  '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"mother","type":"Person"},{"name":"father","type":"Person"}]},"domain":{"name":"Family Tree","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"primaryType":"Person","message":{"name":"Jon","mother":{"name":"Lyanna","father":{"name":"Rickard"}},"father":{"name":"Rhaegar","father":{"name":"Aeris II"}}}}';

export const Methods: { [key: string]: MessageSignMethod } = {
  eth_sign: {
    name: 'eth_sign',
    cases: [
      {
        name: 'Demo 1',
        value:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        name: 'Demo 2',
        value:
          '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      },
    ],
    checkIsTargetMessage: easyCheckMessageHash,
    hashMessage: async (message: string): Promise<string> =>
      Promise.resolve(message),
    signMessage: (
      { account, library }: Web3ReactContextInterface,
      message: string,
    ): Promise<string> =>
      library
        .getSigner(account)
        .provider.provider.send('eth_sign', [account, message])
        .then((response: any) => response?.result || response),
  },
  personal_sign: {
    name: 'personal_sign',
    cases: [
      { name: 'Hello OneKey', value: 'Hello OneKey' },
      { name: 'To Da Moon', value: 'To Da Moon' },
    ],
    checkIsTargetMessage: (message: string | undefined): boolean =>
      typeof message === 'string' && message.length > 0,
    hashMessage: async (message: string): Promise<string> =>
      ethUtil.addHexPrefix(
        ethUtil.hashPersonalMessage(ethUtil.toBuffer(message)).toString('hex'),
      ),
    signMessage: (
      { account, library }: Web3ReactContextInterface,
      message: string,
    ): Promise<string> =>
      library
        .getSigner(account)
        .provider.send('personal_sign', [account, message])
        .then((response: any) => response?.result || response),
  },
  typed_data_sign: {
    name: 'typed_data_sign',
    cases: [
      {
        name: 'Single Value',
        value: '[{"type":"string","name":"message","value":"Hi, Alice!"}]',
      },
      {
        name: 'Multiple values',
        value:
          '[{"type":"string","name":"message","value":"Hi, Alice!"},{"type":"uint8","name":"value","value":10}]',
      },
      {
        name: 'With bytes',
        value: '[{"type":"bytes","name":"message","value":"0xdeadbeaf"}]',
      },
    ],
    preferJsonStringMessage: true,
    checkIsTargetMessage: easyCheckLegacyEIP712Struct,
    hashMessage: async (message: string): Promise<string> =>
      ethUtil.addHexPrefix(signUtil.typedSignatureHash(JSON.parse(message))),
    signMessage: (
      { account, library }: Web3ReactContextInterface,
      message: string,
    ): Promise<string> =>
      library.provider
        .send(
          'eth_signTypedData',
          library.provider.isMetaMask
            ? [JSON.parse(message), account]
            : [account, message],
        )
        .then((response: any) => response?.result || response),
  },
  typed_data_sign_v1: {
    name: 'typed_data_sign_v1',
    cases: [
      {
        name: 'Single Value',
        value: '[{"type":"string","name":"message","value":"Hi, Alice!"}]',
      },
      {
        name: 'Multiple values',
        value:
          '[{"type":"string","name":"message","value":"Hi, Alice!"},{"type":"uint8","name":"value","value":10}]',
      },
      {
        name: 'With bytes',
        value: '[{"type":"bytes","name":"message","value":"0xdeadbeaf"}]',
      },
    ],
    preferJsonStringMessage: true,
    checkIsTargetMessage: easyCheckLegacyEIP712Struct,
    hashMessage: async (message: string): Promise<string> =>
      ethUtil.addHexPrefix(signUtil.typedSignatureHash(JSON.parse(message))),
    signMessage: (
      { account, library }: Web3ReactContextInterface,
      message: string,
    ): Promise<string> =>
      library.provider
        .send('eth_signTypedData_v1', [account, message])
        .then((response: any) => response?.result || response),
  },
  typed_data_sign_v3: {
    name: 'typed_data_sign_v3',
    cases: [
      {
        name: 'Demo',
        value: DEMO_TYPED_DATA_01,
      },
      {
        name: 'With bytes',
        value: DEMO_TYPED_DATA_02,
      },
      {
        name: 'With recursive types',
        value: DEMO_TYPED_DATA_03,
      },
    ],
    preferJsonStringMessage: true,
    checkIsTargetMessage: easyCheckStandardEIP712Struct,
    hashMessage: async (message: string): Promise<string> =>
      ethUtil.addHexPrefix(
        signUtil.TypedDataUtils.sign(JSON.parse(message), false).toString(
          'hex',
        ),
      ),
    signMessage: (
      { account, library }: Web3ReactContextInterface,
      message: string,
    ): Promise<string> =>
      library.provider
        .send('eth_signTypedData_v3', [account, message])
        .then((response: any) => response?.result || response),
  },
  typed_data_sign_v4: {
    name: 'typed_data_sign_v4',
    cases: [
      {
        name: 'Demo',
        value: DEMO_TYPED_DATA_01,
      },
      {
        name: 'With bytes',
        value: DEMO_TYPED_DATA_02,
      },
      {
        name: 'With recursive types',
        value: DEMO_TYPED_DATA_03,
      },
      {
        name: 'With array',
        value:
          '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}]},"domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"primaryType":"Mail","message":{"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"]}],"contents":"Hello, Bob!"}}',
      },
      {
        name: 'With 2D array',
        value:
          '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"},{"name":"logo_matrix","type":"int[][]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}]},"domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"primaryType":"Mail","message":{"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"],"logo_matrix":[[0,255],[-255,-1]]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"],"logo_matrix":[[0,0],[0,0]]}],"contents":"Hello, Bob!"}}',
      },
    ],
    preferJsonStringMessage: true,
    checkIsTargetMessage: easyCheckStandardEIP712Struct,
    hashMessage: async (message: string): Promise<string> =>
      ethUtil.addHexPrefix(
        signUtil.TypedDataUtils.sign(JSON.parse(message), true).toString('hex'),
      ),
    signMessage: (
      { account, library }: Web3ReactContextInterface,
      message: string,
    ): Promise<string> =>
      library.provider
        .send('eth_signTypedData_v4', [account, message])
        .then((response: any) => response?.result || response),
  },
};
