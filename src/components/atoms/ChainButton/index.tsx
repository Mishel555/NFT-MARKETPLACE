import { toast } from 'react-toastify';
import { useSwitchNetwork } from 'wagmi';
import classNames from 'classnames';
import { isMetaMaskInstalled } from '@utils';
import { METAMASK_DEEP_LINK } from '@constants/environment';
import { AvailableNetworks } from '@constants/types';
import { AVAILABLE_NETWORKS } from '@constants/web3';

import MetamaskIcon from '@assets/icons/metamask-icon.png';
import styles from './style.module.scss';

interface IProps {
  name?: string;
  blockchain: AvailableNetworks;
  className?: string;
}

const ChainButton = ({ name, blockchain, className }: IProps) => {
  const newChain = AVAILABLE_NETWORKS[blockchain].chainId;
  const { switchNetwork } = useSwitchNetwork();

  const action = () => {
    if (!switchNetwork) {
      return toast.error('Metamask is not available');
    }

    if (!isMetaMaskInstalled() && METAMASK_DEEP_LINK) {
      return window.location.href = METAMASK_DEEP_LINK;
    }

    switchNetwork(newChain);
  };

  return (
    <button onClick={action} className={classNames(styles.root, className)}>
      <img alt="metamask" src={MetamaskIcon} className={styles.root__icon} />
      <span className={styles.root__text}>
        Add {name ?? blockchain} network
      </span>
    </button>
  );
};

export default ChainButton;
