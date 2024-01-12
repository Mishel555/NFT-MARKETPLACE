import { usePopup } from '@hooks';
import { METAMASK_DEEP_LINK } from '@constants/environment';

import MetamaskIcon from '@assets/icons/metamask-icon.png';
import styles from './style.module.scss';

const MetaMaskAlert = () => {
  const PopupRenderer = usePopup();

  const redirect = () => {
    PopupRenderer.close();
    window.location.href = METAMASK_DEEP_LINK || '';
  };

  return (
    <div className={styles.root}>
      <img alt="metamask" src={MetamaskIcon} className={styles.root_logo} />
      <h1 className={styles.root_title}>
        Your browser doesn't support MetaMask
      </h1>
      <p className={styles.root_info}>
        If you want to use MetaMask switch your browser
      </p>
      <button onClick={redirect} className={styles.root_btn}>
        Switch
      </button>
    </div>
  );
};

export default MetaMaskAlert;
