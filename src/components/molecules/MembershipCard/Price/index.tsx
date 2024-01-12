import { AvailableNetworks } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import { useCurrency } from '@hooks';

import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import UsdIcon from '@assets/icons/usd-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  price: number;
  blockchain: AvailableNetworks;
}

const images: { [key: string]: string } = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
  usd: UsdIcon,
};

const Price = ({ price, blockchain }: IProps) => {
  const { usdRates, currency } = useCurrency();
  const isUsd = currency === 'USD';

  return (
    <div className={styles.root}>
      <div className={styles.root__price}>
        Price: &nbsp;
        <img src={isUsd ? images.usd : images[blockchain]} alt="currency" className={styles.root__price_icon} />
        <span className={styles.root__price_text}>
          {isUsd ? getWithoutNDecimal(price * usdRates[blockchain], 2) : price}
        </span>
      </div>
    </div>
  );
};

export default Price;
