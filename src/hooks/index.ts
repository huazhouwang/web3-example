import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo } from 'react';
import {
  BACKUP_NETWORK_ID,
  backupNetworkConnector,
  injectedNetworkConnector,
} from '../web3/connector';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Web3Provider } from '@ethersproject/providers';

export const useInjectedWeb3React = () => useWeb3React<Web3Provider>();

export const useBackupWeb3React = () =>
  useWeb3React<Web3Provider>(BACKUP_NETWORK_ID);

export const useActiveWeb3React =
  (): Web3ReactContextInterface<Web3Provider> => {
    const injectedProvider = useInjectedWeb3React();
    const backupProvider = useBackupWeb3React();
    return injectedProvider?.active ? injectedProvider : backupProvider;
  };

export const useWeb3ReactActivate = (backup: boolean = false) => {
  const networkKey = backup ? BACKUP_NETWORK_ID : undefined;
  const { active, activate } = useWeb3React<Web3Provider>(networkKey);

  return useCallback(async () => {
    if (!active && activate) {
      const connector = backup
        ? backupNetworkConnector
        : injectedNetworkConnector;

      return activate(connector);
    }
  }, [active, activate]);
};

export const useEagerConnect = () => {
  const activateInjectedWeb3 = useWeb3ReactActivate();
  const activateBackupWeb3 = useWeb3ReactActivate(true);

  useEffect(() => {
    Promise.all([
      injectedNetworkConnector.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          return activateInjectedWeb3();
        }
      }),
      activateBackupWeb3(),
    ]).catch(console.error);
  }, [activateInjectedWeb3, activateBackupWeb3]);
};

export const useContract = (
  address: string,
  contract_factory_class: any,
): object | undefined => {
  const { library, account } = useActiveWeb3React();

  return useMemo((): object | undefined => {
    if (address && library) {
      return contract_factory_class.connect(
        address,
        typeof account === 'string' ? library.getSigner(account) : library,
      );
    }
  }, [address, contract_factory_class, library, account]);
};
