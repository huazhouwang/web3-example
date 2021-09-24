import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const { ethereum } = window;
ethereum && (ethereum.autoRefreshOnNetworkChange = false);

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
if (typeof INFURA_KEY === 'undefined') {
  console.warn(`REACT_APP_INFURA_KEY must be a defined environment variable`);
}

export const backupNetworkConnector = new NetworkConnector({
  urls: {
    1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  defaultChainId: 1,
});
export const BACKUP_NETWORK_ID = 'BACKUP';

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any',
  );
  library.pollingInterval = 15_000;

  return library;
};

export const injectedNetworkConnector = new InjectedConnector({});
