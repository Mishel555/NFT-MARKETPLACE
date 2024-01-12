import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IBid, IArtUser, IArtHistory, IProfileArtType } from '@constants/types';
import api from '@services/api';
import { useAuth, usePopup } from '@hooks';
import TitleSection from '../TitleSection';
import FixedBuy from '../FixedBuy';
import MakeOffer from '../MakeOffer';
import FixedOffer from '../FixedOffer';
import DescriptionSection from '../DescriptionSection';
import History from '../History';
import Offers from '../Offers';

import styles from './style.module.scss';

interface IProps {
  art: IProfileArtType;
}

const TopSection = ({ art }: IProps) => {
  const navigate = useNavigate();
  const popup = usePopup();
  const { user, setRedirectUrl } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const openPopup = searchParams.get('open');

  const {
    _id: id,
    title,
    price,
    copies,
    status,
    auction,
    history,
    description,
    collaborators,
    copiesForSale,
    users,
    artist: creator,
    blockchain,
  } = art;

  const offers = auction?.bids || [];

  const availableCounts = useMemo<number>(() => {
    if (!copies || !copies.length) return 0;

    if (!user) {
      return copies.filter(copy => !copy.owner).length;
    }

    return copies?.filter(copy => (!copy.owner && copy.seller) ? copy.seller !== user['_id'] : false).length;
  }, [copies, user]);

  const intervalTimeout = useRef<number | null>(null);
  const auctionInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [availableForBuy, setAvailableForBuy] = useState<boolean>(false);
  const [showPrice, setShowPrice] = useState<boolean>(true);
  const [copyCount, setCopyCount] = useState<number>(copiesForSale || availableCounts || 0);
  const [bidPrice, setBidPrice] = useState<number>(price || auction?.prices?.start || 0);
  const [localHistory, setLocalHistory] = useState<IArtHistory[]>(history);
  const [localBids, setLocalBids] = useState<IBid[]>(offers);
  const [localUsers, setLocalUsers] = useState<{ [key: string]: IArtUser }>(users);
  const [endDate, setEndDate] = useState<string | null>(auction?.endsAt || null);
  const [closedDate, setClosedDate] = useState<string | null>(auction?.closedAt || null);

  const updateAuction = useCallback(async () => {
    try {
      const { data } = await api.art.getSingle(id);
      const { price, history, auction } = data as IProfileArtType;
      if (!auction) return;

      setBidPrice(price);
      setLocalUsers(data.users);
      setLocalHistory(history);
      setLocalBids(auction.bids);
      setEndDate(auction.endsAt);
      setClosedDate(auction.closedAt || null);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const activateInterval = useCallback((interval: number) => {
    if (intervalTimeout.current === interval) return;

    intervalTimeout.current = interval;
    auctionInterval.current = setInterval(updateAuction, interval);
  }, [updateAuction]);

  const buyArt = useCallback(async () => {
    if (!user) {
      setRedirectUrl(`/art/${id}?open=buy`);
      return navigate('/signIn');
    }

    popup.setData({
      id,
      cb: async () => {
        try {
          const { data } = await api.art.getSingle(id);

          setLocalUsers(data.users);
          setLocalHistory(data.history);
          setCopyCount(prevState => prevState - 1);
        } catch (e) {
          console.log(e);
        }
      },
    });
    popup.open('buy_art');
  }, [user, navigate]);

  const buyNow = () => {
    if (!user) {
      setRedirectUrl(`/art/${id}?open=buyNow`);
      return navigate('/signIn');
    }

    popup.setData({
      id,
    });
    popup.open('buy_now');
  };

  const makeOffer = () => {
    if (!user) {
      setRedirectUrl(`/art/${id}?open=offer`);
      return navigate('/signIn');
    }

    popup.setData({
      offerProps: {
        artId: id,
        cb: updateAuction
      },
      price,
      blockchain,
    });

    popup.open('auction_notification');
  };

  useEffect(() => {
    if (status !== 'published') {
      return setAvailableForBuy(false);
    }

    if (!user) {
      setShowPrice(true);
      return setAvailableForBuy(true);
    }

    if (!blockchain) {
      setShowPrice(false);
      return setAvailableForBuy(false);
    }

    if (!copyCount) {
      setShowPrice(true);
      return setAvailableForBuy(false);
    }

    setShowPrice(true);
    setAvailableForBuy(true);

    return () => {
      if (auctionInterval.current) {
        clearInterval(auctionInterval.current);
      }
    };
  }, [copyCount]);

  useEffect(() => {
    if (!openPopup) return;
    switch (openPopup) {
      case 'buy':
        setTimeout(buyArt, 500);
        break;
      case 'buyNow':
        setTimeout(buyNow, 500);
        break;
      case 'offer':
        setTimeout(makeOffer, 500);
        break;
    }

    setSearchParams({});
  }, [openPopup]);

  return (
    <div className={styles.root}>
      <div className={styles.root__info}>
        <div className={styles.root__info_wrapper}>
          <TitleSection title={title} creator={creator} collaborators={collaborators} />
          <DescriptionSection description={description} />
        </div>
        {!availableForBuy && !showPrice && !auction?.prices && blockchain && (
          <div className={styles.root__info_wrapper}>
            <History history={history} blockchain={blockchain} users={localUsers} />
          </div>
        )}

        {(availableForBuy || showPrice) && blockchain && !auction?.prices && (
          <div className={styles.root__info_wrapper}>
            <FixedBuy
              availableForBuy={availableForBuy}
              price={price}
              copyCount={copyCount}
              availableCounts={availableCounts}
              blockchain={blockchain}
              buyArt={buyArt}
            />
            <History history={localHistory} blockchain={blockchain} users={localUsers} />
          </div>
        )}

        {showPrice && endDate && blockchain && auction?.prices && !auction.prices.buyNow && (
          <MakeOffer
            id={id}
            endDate={endDate}
            copyCount={copyCount}
            activePrice={bidPrice}
            prices={auction.prices}
            blockchain={blockchain}
            closedDate={closedDate}
            lastCopy={copies && copies[0]}
            lastBid={localBids[localBids.length - 1]}
            availableCounts={availableCounts}
            availableForBuy={availableForBuy}
            makeOffer={makeOffer}
            updateAuction={updateAuction}
            activateInterval={activateInterval}
          />
        )}

        {showPrice && endDate && blockchain && auction?.prices && auction.prices.buyNow && (
          <FixedOffer
            id={id}
            availableForBuy={availableForBuy}
            prices={auction.prices}
            activePrice={bidPrice || price}
            copyCount={copyCount}
            availableCounts={availableCounts}
            blockchain={blockchain}
            endDate={endDate}
            closedDate={closedDate}
            lastBid={localBids[localBids.length - 1]}
            lastCopy={copies && copies[0]}
            buyArt={buyNow}
            makeOffer={makeOffer}
            updateAuction={updateAuction}
            activateInterval={activateInterval}
          />
        )}
      </div>
      {!!auction?.prices && (
        <div className={styles.root__info}>
          <History history={localHistory} blockchain={blockchain ?? 'ethereum'} users={localUsers} />
          <Offers bids={localBids} blockchain={blockchain ?? 'ethereum'} users={localUsers} />
        </div>
      )}
    </div>
  );
};

export default TopSection;
