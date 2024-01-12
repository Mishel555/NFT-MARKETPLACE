import { useAccount } from 'wagmi';
import { isMetaMaskInstalled } from '@utils';

import MetamaskAlert from './MetamaskAlert';
import NotConnected from './NotConnected';
import Connected from './Connected';

import styles from './style.module.scss';

const Metamask = () => {
  const { isConnected } = useAccount();

  return (
    <div className={styles.root}>
      {!isMetaMaskInstalled() ? <MetamaskAlert /> : (
        isConnected ? <Connected /> : <NotConnected />
      )}
    </div>
  );
};

export default Metamask;
