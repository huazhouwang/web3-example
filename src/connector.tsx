import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK');

const { ethereum } = window as any;
ethereum && (ethereum.autoRefreshOnNetworkChange = false);

export const createBackupProvider = (): JsonRpcProvider | undefined => {
  try {
    const url = process.env['REACT_APP_DEFAULT_ETH_RPC_URL'];
    if (url) {
      return new JsonRpcProvider({ url: url, allowGzip: true });
    }
  } catch (e) {
    console.error(e);
  }
};

const getLibrary = (provider: any) =>
  new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any',
  );

const Web3Root = ({ children }: { children: any }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      {children}
    </Web3ProviderNetwork>
  </Web3ReactProvider>
);

export const injectedNetwork = new InjectedConnector({});
export default Web3Root;
