import { Fragment, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { AvailableNetworks, IAuction, IBid, INft } from '@constants/types';
import { useAuth, useCurrency } from '@hooks';
import { getWithoutNDecimal } from '@utils';
import { CopyBadge } from '@components/atoms';
import Countdown from '../Countdown';

import UsdIcon from '@assets/icons/usd-black-icon.svg';
import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  id: string;
  availableForBuy: boolean;
  prices: IAuction['prices'];
  activePrice: number;
  copyCount: number;
  availableCounts: number;
  blockchain: AvailableNetworks;
  endDate: string;
  closedDate: string | null;
  lastBid?: IBid;
  lastCopy?: INft;
  buyArt: () => void;
  makeOffer: () => void;
  updateAuction: () => void;
  activateInterval: (interval: number) => void;
}

const images: { [key: string]: string } = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
  usd: UsdIcon,
};

const FixedOffer = ({
  id,
  prices,
  activePrice,
  copyCount,
  blockchain,
  endDate,
  closedDate,
  availableCounts,
  availableForBuy,
  lastBid,
  lastCopy,
  buyArt,
  makeOffer,
  updateAuction,
  activateInterval,
}: IProps) => {
  const { user } = useAuth();
  const { usdRates, currency } = useCurrency();
  const isUsd = currency === 'USD';

  const showPrice = useMemo<number>(() => {
    let value = activePrice;

    if (!closedDate) {
      return value;
    }

    if (lastCopy) {
      if (lastCopy.owner) {
        value = lastCopy.price;
      } else {
        value = prices.start;
      }
    }

    if (!value) {
      value = activePrice;
    }

    return value;
  }, [prices, lastCopy, activePrice, closedDate]);

  const allowBid = useMemo<boolean>(() => {
    if (!lastBid || !user) return true;

    return lastBid.user !== user['_id'];
  }, [lastBid]);

  const [showBuyNow, setShowBuyNow] = useState<boolean>(false);

  useEffect(() => {
    if (closedDate) return setShowBuyNow(false);

    if (!lastCopy) return setShowBuyNow(true);

    if (prices.buyNow) {
      if (lastCopy.price >= prices.buyNow * 0.8 || activePrice >= prices.buyNow * 0.8) return setShowBuyNow(false);
    }

    if (!prices.minimum) return setShowBuyNow(true);

    if (lastCopy.price >= prices.minimum) return setShowBuyNow(false);

    if (activePrice >= prices.minimum) return setShowBuyNow(false);

    setShowBuyNow(true);
  }, [prices, activePrice, closedDate]);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.root__wrap}>
          {showBuyNow && prices.buyNow && (
            <Fragment>
              <div className={styles.root__wrap_item}>
                <span className={styles.root__label}>Max price</span>
                <div className={styles.root__item}>
                  <p className={styles.root__price}>
                    {isUsd ? (
                      <img src={images.usd} alt="blockchain" />
                    ) : (
                      <img src={images[blockchain]} alt="blockchain" />
                    )}
                    {isUsd ? getWithoutNDecimal(prices.buyNow * usdRates[blockchain], 2) : prices.buyNow}
                  </p>
                  {!!closedDate && (
                    <CopyBadge count={availableCounts || copyCount} />
                  )}
                </div>
                {(!closedDate && availableForBuy) && (
                  <button disabled={!allowBid} className={styles.root__btn} onClick={buyArt}>
                    Buy Now
                  </button>
                )}
              </div>
              <div className={styles.root__divider} />
            </Fragment>
          )}
          {!closedDate && (
            <div className={styles.root__wrap_item}>
              <span className={styles.root__label}>Make an Offer</span>
              <div className={styles.root__item}>
                <p className={classNames(styles.root__price, styles.root__offerPrice)}>
                  {isUsd ? (
                    <img src={images.usd} alt="blockchain" />
                  ) : (
                    <img src={images[blockchain]} alt="blockchain" />
                  )}
                  {isUsd ? getWithoutNDecimal(showPrice * usdRates[blockchain], 2) : showPrice}
                </p>
                <CopyBadge count={availableCounts || copyCount} />
              </div>
              {availableForBuy && (
                <button
                  disabled={!allowBid}
                  onClick={makeOffer}
                  className={classNames(styles.root__btn, styles.root__offerBtn)}
                >
                  Make Offer
                </button>
              )}
            </div>
          )}
        </div>
        <Countdown
          id={id}
          from={endDate}
          availableForBuy={availableForBuy}
          activateInterval={activateInterval}
          updateAuction={updateAuction}
          closedDate={closedDate}
        />
      </div>
    </div>
  );
};

export default FixedOffer;
