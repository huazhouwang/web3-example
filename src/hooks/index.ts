import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
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
