import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import { ALLOWED_CHAINS, NETWORK_ENV } from '@constants/web3';
import api from '@services/api';
import { CloseIcon } from '@components/icons';

import styles from './style.module.scss';

interface IChain {
  name: string;
  chain: string;
  chainId: number;
}

const NetworkNotification = () => {
  const { chain } = useNetwork();

  const [show, setShow] = useState<boolean>(false);
  const [chainInfo, setChainInfo] = useState<IChain | null>(null);

  const close = () => setShow(false);

  useEffect(() => {
    let mounted = true;

    if (!chain?.id) return;

    if (ALLOWED_CHAINS.includes(chain.id)) {
      return setShow(false);
    }

    const getData = async () => {
      try {
        if (!chain?.id) return;

        const { data } = await api.web3.getChains();
        const currentChain = data.find((network: IChain) => chain.id === network.chainId);

        if (mounted && currentChain) {
          setShow(true);
          setChainInfo(currentChain);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();

    return () => {
      mounted = false;
    };
  }, [chain]);

  return show ? (
    <div className={styles.root}>
      <p className={styles.root__text}>
        You're viewing data from the {NETWORK_ENV === 'stage' ? 'test' : 'main'} network (Ethereum, Polygon),
        but your wallet is connected to the {chainInfo?.name}.
        To use ArtInSpace, please switch your wallet to {NETWORK_ENV === 'stage' ? 'test' : 'main'} network
      </p>
      <button onClick={close} className={styles.root__close}>
        <CloseIcon width={18} height={18} fill="#000" />
      </button>
    </div>
  ) : null;
};

export default NetworkNotification;
