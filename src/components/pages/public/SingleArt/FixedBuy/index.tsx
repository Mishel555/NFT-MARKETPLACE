import { Fragment } from 'react';
import { AvailableNetworks } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import { useCurrency } from '@hooks';
import { CopyBadge } from '@components/atoms';

import UsdIcon from '@assets/icons/usd-black-icon.svg';
import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  availableForBuy: boolean;
  price: number;
  copyCount: number;
  availableCounts: number;
  blockchain: AvailableNetworks;
  buyArt: () => void;
}

const images: { [key: string]: string } = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
  usd: UsdIcon,
};

const FixedBuy = ({
  price,
  copyCount,
  blockchain,
  availableCounts,
  availableForBuy,
  buyArt,
}: IProps) => {
  const { usdRates, currency } = useCurrency();
  const isUsd = currency === 'USD';

  return (
    <div className={styles.root}>
      <div className={styles.root__wrap}>
      <span className={styles.root__label}>
        {availableForBuy ? 'Buy now' : 'Price and available quantity'}
      </span>
        <p className={styles.root__price}>
          {isUsd ? (
            <img src={images.usd} alt="blockchain" />
          ) : (
            <img src={images[blockchain]} alt="blockchain" />
          )}
          {isUsd ? getWithoutNDecimal(price * usdRates[blockchain], 2) : price}
        </p>
        {!availableForBuy && !!availableCounts && (
          <CopyBadge count={availableCounts} />
        )}
        {availableForBuy && (
          <Fragment>
            <CopyBadge count={copyCount} />
            <button className={styles.root__btn} onClick={buyArt}>
              Buy Now
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default FixedBuy;
