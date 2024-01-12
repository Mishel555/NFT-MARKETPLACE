import { useAccount, useBalance, useNetwork } from 'wagmi';
import { getWithoutNDecimal } from '@utils';

import MetamaskIcon from '@assets/icons/metamask-icon.png';
import styles from './style.module.scss';

const Connected = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div className={styles.root__form_block}>
      <div className={styles.root__form_metamask}>
        <div className={styles.root__form_metamask_block}>
          <div className={styles.root__form_metamask_icon}>
            <img src={MetamaskIcon} alt="" />
          </div>
          <div className={styles.root__form_metamask_info}>
            <p className={styles.root__form_metamask_status}>
              Connected!
            </p>
            <p className={styles.root__form_metamask_total}>
              Balance:
              <span>
                {balance ? getWithoutNDecimal(+balance.formatted, 3) : 0} {chain?.nativeCurrency.symbol}
              </span>
            </p>
          </div>
        </div>
        {/* <button className={styles.root__form_metamask_btn} onClick={changeAccount}> */}
        {/*   Change account */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default Connected;
