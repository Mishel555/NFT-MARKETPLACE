import InfoIcon from '@assets/icons/info_icon_black.svg';
import styles from './style.module.scss';

const MetamaskAlert = () => {
  const tryAgain = (): void => {
    window.location.reload();
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__message}>
        <img alt="info" src={InfoIcon} />
        <p className={styles.root__message__text}>
          You have not installed Metamask. To continue &nbsp;
          <a href="https://metamask.io/download/" target="_blank">
            Download Metamask
          </a>
          &nbsp; and install it to Your browser.
        </p>
      </div>
      <button onClick={tryAgain} className={styles.root__btn}>
        Try again
      </button>
    </div>
  );
};

export default MetamaskAlert;
