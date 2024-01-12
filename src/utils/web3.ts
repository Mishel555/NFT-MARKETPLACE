import Web3 from 'web3';
import { AvailableNetworks } from '@constants/types';
import { AVAILABLE_NETWORKS } from '@constants/web3';

const { ethereum } = window;

export const isBrowserSupport = () => !!ethereum;

export const isMetaMaskInstalled = () => !!ethereum?.isMetaMask;

export const getChainId = (blockchain: AvailableNetworks) => {
  const currentChain = AVAILABLE_NETWORKS[blockchain];

  return currentChain.chainId;
};

export const getChainCurrency = (blockchain: AvailableNetworks) => {
  const currentChain = AVAILABLE_NETWORKS[blockchain];

  return currentChain.nativeCurrency.symbol;
};

// only from available networks...
export const addChainToList = async (name: string) => {
  const {
    chainId,
    blockExplorerUrls,
    chainName,
    rpcUrls,
    nativeCurrency,
  } = AVAILABLE_NETWORKS[name];

  return await ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      rpcUrls,
      chainName,
      nativeCurrency,
      blockExplorerUrls,
      chainId: `0x${chainId.toString(16)}`,
    }],
  });
};

// only from available chains...
export const switchChain = async (name: AvailableNetworks) => {
  try {
    if (name in AVAILABLE_NETWORKS) {
      return await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(AVAILABLE_NETWORKS[name].chainId) }],
      });
    }

    throw new Error('Unavailable network');
  } catch (e) {
    const error = e as { code: number };

    if (error.code === 4902) {
      return await addChainToList(name);
    }

    throw new Error((e as Error).message || e as string);
  }
};
