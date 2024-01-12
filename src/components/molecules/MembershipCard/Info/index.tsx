import { AvailableNetworks } from '@constants/types';
import { CopyBadge } from '@components/atoms';
import Price from '../Price';

import styles from './style.module.scss';

interface IProps {
  title: string;
  price: number;
  available: boolean;
  isUpgrade: boolean;
  copies: number;
  blockchain: AvailableNetworks;
  buy: () => void;
}

const Info = ({
  buy,
  title,
  price,
  copies,
  isUpgrade,
  available,
  blockchain,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__top}>
      <h1 className={styles.root__title}>{title}</h1>
      <CopyBadge count={copies} />
    </div>
    <div className={styles.root__bottom}>
      <Price price={price} blockchain={blockchain} />
      {available && (
        <button onClick={buy} disabled className={styles.root__button}>
          {isUpgrade ? 'Upgrade now' : 'Get'}
        </button>
      )}
    </div>
  </div>
);

export default Info;
