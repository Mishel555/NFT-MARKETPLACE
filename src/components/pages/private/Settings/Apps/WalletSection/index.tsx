import { useAccount } from 'wagmi';
import { useAuth } from '@hooks';

import MetamaskIcon from '@assets/icons/metamask-icon.png';
import styles from './style.module.scss';
// import { isMobile } from 'react-device-detect';
// import { METAMASK_DEEP_LINK } from '@constants/environment';
// import { isMetaMaskInstalled } from '@utils';

const WalletSection = () => {
  const { address } = useAccount();
  // const { connect, connectors } = useConnect();
  const { user } = useAuth();

  // const changeAccount = (): void => {
  //   if (isMobile && METAMASK_DEEP_LINK && !isMetaMaskInstalled()) {
  //     window.location.href = `${METAMASK_DEEP_LINK}/settings/apps`;
  //     return;
  //   }
  //
  //   connect({ connector: connectors[0] });
  // };

  return (
    <div className={styles.root}>
      <div className={styles.root__inner}>
        <div className={styles.root__metamask}>
          <div className={styles.root__icon}>
            <img src={MetamaskIcon} alt="" />
          </div>
          <div className={styles.root__info}>
            <p className={styles.root__info__subtitle}>
              Metamask
            </p>
            <p className={styles.root__info__text}>
              {address || user?.wallet}
            </p>
          </div>
        </div>
        {/* <button onClick={changeAccount} className={styles.root__disconnect}> */}
        {/*   Change */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default WalletSection;
