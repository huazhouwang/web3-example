import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { BACKUP_NETWORK_ID, getLibrary } from './connector';
import React from 'react';
import { useEagerConnect } from '../hooks';

const BackupWeb3ReactProvider = createWeb3ReactRoot(BACKUP_NETWORK_ID);

const EagerConnectWrapper = () => {
  useEagerConnect();
  return <></>;
};

const Web3Root = ({ children }: { children: JSX.Element }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BackupWeb3ReactProvider getLibrary={getLibrary}>
        <EagerConnectWrapper />
        {children}
      </BackupWeb3ReactProvider>
    </Web3ReactProvider>
  );
};

export default Web3Root;
