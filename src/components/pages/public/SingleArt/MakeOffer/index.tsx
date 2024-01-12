import { Fragment, useMemo } from 'react';
import { AvailableNetworks, IAuction, IBid, INft } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import { useAuth, useCurrency } from '@hooks';
import { CopyBadge } from '@components/atoms';
import Countdown from '../Countdown';

import UsdIcon from '@assets/icons/usd-black-icon.svg';
import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  id: string;
  endDate: string;
  copyCount: number;
  activePrice: number;
  availableCounts: number;
  availableForBuy: boolean;
  prices: IAuction['prices'];
  blockchain: AvailableNetworks;
  lastBid?: IBid;
  lastCopy?: INft;
  closedDate?: string | null;
  makeOffer: () => void;
  updateAuction: () => void;
  activateInterval: (interval: number) => void;
}

const images: { [key: string]: string } = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
  usd: UsdIcon,
};

const MakeOffer = ({
  id,
  prices,
  endDate,
  lastBid,
  lastCopy,
  copyCount,
  blockchain,
  closedDate,
  activePrice,
  availableCounts,
  availableForBuy,
  makeOffer,
  updateAuction,
  activateInterval,
}: IProps) => {
  const { user } = useAuth();
  const { currency, usdRates } = useCurrency();
  const isUsd = currency === 'USD';

  const showPrice = useMemo<number>(() => {
    let value = activePrice;

    if (lastBid && lastCopy) {
      if (lastCopy.owner) {
        value = lastBid.price;
      } else {
        value = prices.start;
      }
    }

    return value;
  }, [prices, lastCopy, lastBid, activePrice, closedDate]);

  const allowBid = useMemo<boolean>(() => {
    if (!lastBid || !user) return true;

    return lastBid.user !== user['_id'];
  }, [lastBid]);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.root__wrap}>
          <span className={styles.root__label}>Price</span>
          <p className={styles.root__price}>
            {isUsd ? (
              <img src={images.usd} alt="blockchain" />
            ) : (
              <img src={images[blockchain]} alt="blockchain" />
            )}
            {isUsd ? getWithoutNDecimal(showPrice * usdRates[blockchain], 2) : showPrice}
          </p>
          {!availableForBuy && (
            <CopyBadge count={availableCounts} />
          )}
          {(!closedDate && availableForBuy) && (
            <Fragment>
              <CopyBadge count={copyCount} />
              <button disabled={!allowBid} className={styles.root__btn} onClick={makeOffer}>
                Make offer
              </button>
            </Fragment>
          )}
        </div>
        <Countdown
          id={id}
          from={endDate}
          availableForBuy={availableForBuy}
          updateAuction={updateAuction}
          activateInterval={activateInterval}
          closedDate={closedDate}
        />
      </div>
    </div>
  );
};

export default MakeOffer;
