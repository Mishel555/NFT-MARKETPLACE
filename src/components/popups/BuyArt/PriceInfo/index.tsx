import { getWithoutNDecimal } from '@utils';
import { AvailableNetworks } from '@constants/types';
import { useCurrency } from '@hooks';

import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import styles from './style.module.scss';

interface IProps {
  price: number;
  count: number;
  blockchain: AvailableNetworks;
}

const PriceInfo = ({ price, count, blockchain }: IProps) => {
  const { usdRates } = useCurrency();

  return (
    <div className={styles.root}>
      <div className={styles.root__item}>
        <span className={styles.root__title}>
          Items selected
        </span>
        <br />
        <br />
        <div className={styles.root__wrapper}>
          <h2 className={styles.root__item_number}>{count} x</h2>
        </div>
      </div>
      <div className={styles.root__item}>
        <span className={styles.root__title}>
          Total price
        </span>
        <br />
        <br />
        <div className={styles.root__wrapper}>
          <img
            src={blockchain === 'polygon' ? PolygonIcon : BlackEthIcon}
            alt="blockchain"
            className={styles.root__item_icon}
          />
          <h2 className={styles.root__item_price}>{getWithoutNDecimal(price, 5)}</h2>
        </div>
        <span className={styles.root__item_usd}>
          $ {getWithoutNDecimal(price * usdRates[blockchain], 2)}
        </span>
      </div>
    </div>
  );
};

export default PriceInfo;
