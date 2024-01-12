import { Fragment, useMemo } from 'react';
import { AvailableNetworks, MembershipType } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import { useAuth, useCurrency } from '@hooks';
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
  currentType: MembershipType;
  blockchain: AvailableNetworks;
  buyArt: (upgrade?: boolean) => void;
}

const initialMembership = {
  hasStandardMembership: false,
  hasPlatinumMembership: false,
};

const images: { [key: string]: string } = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
  usd: UsdIcon,
};

const FixedBuy = ({
  price,
  buyArt,
  copyCount,
  blockchain,
  currentType,
  availableCounts,
  availableForBuy,
}: IProps) => {
  const { user } = useAuth();

  const { hasStandardMembership, hasPlatinumMembership } = user ? user : initialMembership;

  const isUpgrade = !hasPlatinumMembership && hasStandardMembership && currentType === 'Platinum Membership';

  const showBuy = useMemo(() => {
    if (!user) return true;

    if (hasPlatinumMembership) return false;

    if (hasStandardMembership && currentType === 'Standard Membership') return false;

    return user.role.name === 'gallery';
  }, [user, currentType]);

  const {
    usdRates,
    currency
  } = useCurrency();
  const isUsd = currency === 'USD';

  return (
    <div className={styles.root}>
      <div className={styles.root__wrap}>
      <span className={styles.root__label}>
        {availableForBuy ?
          isUpgrade ? 'Upgrade Now' : 'Buy Now'
          : 'Price and available quantity'}
      </span>
        <p className={styles.root__price}>
          {isUsd ? (
            <img src={images.usd} alt="blockchain" />
          ) : (
            <img src={images[blockchain]} alt="blockchain" />
          )}
          {isUsd ? getWithoutNDecimal(price * usdRates[blockchain], 2) : price}
        </p>
        {!availableForBuy && availableCounts && (
          <CopyBadge count={availableCounts} />
        )}
        {availableForBuy && (
          <Fragment>
            <CopyBadge count={copyCount} />
            {!isUpgrade && showBuy && (
              <button className={styles.root__btn} onClick={() => buyArt()}>
                Buy now
              </button>
            )}

            {isUpgrade && (
              <button className={styles.root__btn} onClick={() => buyArt(isUpgrade)}>
                Upgrade now
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default FixedBuy;
