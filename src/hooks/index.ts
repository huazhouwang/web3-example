import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { injectedNetwork } from '../connector';

export const useInjectedWeb3Activate = (): [boolean, () => void] => {
  const [isAutoConnect, setIsAutoConnect] = useState<boolean>(false);
  const { active, activate } = useWeb3React();

  const inject = useCallback(() => {
    if (active) {
      return;
    }

    return activate(injectedNetwork);
  }, [active, activate]);

  useEffect(() => {
    injectedNetwork.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        inject()?.then(() => setIsAutoConnect(true));
      }
    });
  }, [inject]);

  return [isAutoConnect, inject];
};

export const useContract = (
  address: string,
  contract_factory_class: any,
): object | undefined => {
  const { library, account } = useWeb3React();

  return useMemo((): object | undefined => {
    if (address && library) {
      return contract_factory_class.connect(
        address,
        typeof account === 'string' ? library.getSigner(account) : library,
      );
    }
  }, [address, contract_factory_class, library, account]);
};
