import { isMobile } from 'react-device-detect';
import { METAMASK_DEEP_LINK } from '@constants/environment';

import InfoIcon from '@assets/icons/info_icon_black.svg';
import styles from './style.module.scss';

const MetamaskAlert = () => {
  const tryAgain = (): void => {
    window.location.reload();
  };

  const navigate = () => {
    window.open(`${METAMASK_DEEP_LINK}/signUp`, '_blank');
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__message}>
        <img alt="info" src={InfoIcon} />
        <p className={styles.root__message__text}>
          {isMobile ? 'Please open your metamask app and select browser to proceed with the registration.' : 'You have not installed Metamask. To continue'}
          &nbsp;
          {isMobile ? (
            <button onClick={navigate} className={styles.root__message__text_link}>
              Use Metamask
            </button>
          ) : (
            <a href="https://metamask.io/download/" target="_blank" className={styles.root__message__text_link}>
              Download Metamask
            </a>
          )}
          &nbsp;
          {isMobile ? 'link to install Metamask.' : 'and install it to Your browser.'}
        </p>
      </div>
      {!isMobile && (
        <button onClick={tryAgain} className={styles.root__btn}>
          Try again
        </button>
      )}
    </div>
  );
};

export default MetamaskAlert;
