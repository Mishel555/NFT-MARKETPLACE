import { AvailableNetworks } from '@constants/types';
import { useCurrency } from '@hooks';
import { getWithoutNDecimal } from '@utils';

import styles from './style.module.scss';
import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';

interface IProps {
  price: number;
  balance?: number;
  blockchain: AvailableNetworks;
}

const images: { [key in AvailableNetworks]: string } = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
};

const Info = ({
  price,
  balance,
  blockchain,
}: IProps) => {
  const { usdRates } = useCurrency();

  return (
    <div className={styles.root}>
      <div className={styles.root__item}>
        <p className={styles.root__item_name}>Balance</p>
        <div className={styles.root__price}>
          <img src={images[blockchain]} alt="blockchain" className={styles.root__price_img} />
          <p className={styles.root__price_text}>
            {balance ? balance : '--'}
          </p>
        </div>
        <p className={styles.root__usd}>
          $ {balance ? getWithoutNDecimal(balance * usdRates[blockchain], 2) : '--'}
        </p>
      </div>
      <div className={styles.root__item}>
        <p className={styles.root__item_name}>Best offer</p>
        <div className={styles.root__price}>
          <img src={images[blockchain]} alt="blockchain" className={styles.root__price_img} />
          <p className={styles.root__price_text}>
            {price || '--'}
          </p>
        </div>
        <p className={styles.root__usd}>
          $ {price ? getWithoutNDecimal(price * usdRates[blockchain], 2) : '--'}
        </p>
      </div>
    </div>
  );
};

export default Info;
