import { useState } from 'react';
import { useConnect } from 'wagmi';
import classNames from 'classnames';

import MetamaskIcon from '@assets/icons/metamask-icon.png';
import styles from './style.module.scss';

const NotConnected = () => {
  const { connect, connectors } = useConnect();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const connectWallet = async () => {
    setIsProcessing(true);
    await connect({ connector: connectors[0] });
    setIsProcessing(false);
  };

  return (
    <div className={styles.root_block}>
      <div className={classNames(styles.root_block_inner, isProcessing && styles.root_block_inner_processing)}>
        <button className={styles.root_btn} onClick={connectWallet}>
          <img src={MetamaskIcon} alt="" />
          Connect with metamask
        </button>
      </div>
      {isProcessing && (
        <div className={styles.root_loader}>
          <div className={styles.loader}>
            <span></span>
          </div>
          <p className={styles.root_loader_text}>
            Processing...
          </p>
        </div>
      )}
    </div>
  );
};

export default NotConnected;
