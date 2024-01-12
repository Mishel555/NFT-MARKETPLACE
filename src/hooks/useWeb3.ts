import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import { useAccount, useConnect } from 'wagmi';
import { Web3MethodsType, Web3ParamsType, Web3ResponseType, Web3ServiceGroupType } from '@constants/types';
import { METAMASK_DEEP_LINK } from '@constants/environment';
import web3 from '@services/web3';
import { isMetaMaskInstalled, switchChain } from '@utils';

interface ISendConfig {
  redirectUrl?: string;
}

const useWeb3 = () => {
  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const call = useCallback(() => {
  }, []);

  const send = useCallback(async <T extends Web3MethodsType>(
    method: T,
    params: Web3ParamsType<T>,
    config?: ISendConfig,
  ): Promise<Web3ResponseType<T>> => {
    const actionGroup = method.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')[0];

    if (!isMetaMaskInstalled()) {
      if (isMobile && METAMASK_DEEP_LINK) {
        window.location.href = config?.redirectUrl ?? METAMASK_DEEP_LINK;
        throw new Error('Metamask is not installed');
      }

      toast.error('Metamask is not installed');
      throw new Error('Metamask is not installed');
    }

    let publicAddress = address;

    if (!isConnected || !publicAddress) {
      const { account } = await connectAsync({ connector: connectors[0] });
      publicAddress = account;
    }

    if (method !== 'balanceGet') {
      await switchChain(params.blockchain);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await web3[actionGroup as Web3ServiceGroupType][method as string]({ ...params, address: publicAddress });
  }, [address, connectAsync, connectors, isConnected]);

  return {
    call,
    send,
  };
};

export default useWeb3;
