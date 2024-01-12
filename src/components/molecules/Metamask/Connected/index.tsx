import { useMemo } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { getShortAddress, getWithoutNDecimal } from '@utils';

import MetamaskIcon from '@assets/icons/metamask-icon.png';
import styles from './style.module.scss';

const Connected = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const shortAddress = useMemo(() => getShortAddress(address || ''), [address]);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <img src={MetamaskIcon} className={styles.root__icon} alt="" />
        <div>
          <p className={styles.root__address}>Account {shortAddress}</p>
          <p className={styles.root__balance}>
            {balance ? getWithoutNDecimal(+balance.formatted, 3) : 0} {chain?.nativeCurrency.symbol}
          </p>
        </div>
      </div>
      <p className={styles.root__status}>
        Connected!
      </p>
    </div>
  );
};

export default Connected;
