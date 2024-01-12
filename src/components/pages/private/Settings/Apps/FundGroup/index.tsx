import { useMemo } from 'react';
import { AvailableNetworks, IBalances } from '@constants/types';

import styles from './style.module.scss';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import BlackEthIcon from '@assets/icons/black-eth-icon.svg';

interface IProps {
  title: string;
  balance: IBalances;
  onCollect: (blockchain: AvailableNetworks) => void;
}

const FundGroup = ({
  title,
  balance,
  onCollect,
}: IProps) => {
  const { ethereum, polygon } = useMemo(() => ({
    ethereum: balance.ethereum,
    polygon: balance.polygon,
  }), [balance]);

  return (
    <div className={styles.root}>
      <div className={styles.root__heading}>
        <p className={styles.root__title}>{title}</p>
        <p className={styles.root__title}>Action</p>
      </div>
      <div className={styles.root__wrapper}>
        <p className={styles.root__balance}>
          <img src={BlackEthIcon} alt="crypto" />
          {ethereum}
        </p>
        <button onClick={() => onCollect('ethereum')} disabled={!ethereum} className={styles.root__button}>
          Withdraw
        </button>
      </div>
      <div className={styles.root__wrapper}>
        <p className={styles.root__balance}>
          <img src={PolygonIcon} alt="crypto" />
          {polygon}
        </p>
        <button onClick={() => onCollect('polygon')} disabled={!polygon} className={styles.root__button}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default FundGroup;
