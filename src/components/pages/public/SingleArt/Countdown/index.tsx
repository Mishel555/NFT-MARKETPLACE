import { useEffect, useMemo, useRef, useState } from 'react';
// import { toast } from 'react-toastify';
// import { AxiosError } from 'axios';
import moment from 'moment';
// import api from '@services/api';
// import { IProfileArtType } from '@constants/types';
// import { useAuth, usePopup, useWeb3 } from '@hooks';

import styles from './style.module.scss';

interface IProps {
  id: string;
  from: string;
  activateInterval: (interval: number) => void;
  updateAuction: () => void;
  availableForBuy?: boolean;
  closedDate?: string | null;
}

const Countdown = ({
  // id,
  from,
  closedDate,
  // availableForBuy,
  // updateAuction,
  activateInterval,
}: IProps) => {
  // const popup = usePopup();
  // const { user } = useAuth();
  // const { endAuctionBySeller } = useWeb3();

  const endDate = useMemo(() => moment(from), [from]);
  const closedTime = useMemo(() => closedDate ? moment(closedDate) : null, [closedDate]);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [diff, setDiff] = useState<number>(0);

  const {
    days,
    hours,
    minutes,
    seconds,
  } = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };

  // const close = async () => {
  //   try {
  //     popup.setData({
  //       firstMessage: 'You want to close auction',
  //       confirm: async () => {
  //         const { data: artResponse } = await api.art.getSingle(id);
  //         const art = artResponse as IProfileArtType;
  //         const nftId = art.copies ? art.copies[0]?.nftId : null;
  //
  //         if (!art.blockchain || !nftId) {
  //           return toast.error('You can not close this auction');
  //         }
  //
  //         await endAuctionBySeller({ tokenId: nftId, close: true, blockchain: art.blockchain });
  //
  //         await api.art.closeAuction(id);
  //         updateAuction();
  //
  //         if (interval.current) {
  //           clearInterval(interval.current);
  //         }
  //
  //         setTimeout(() => setDiff(0), 1500);
  //       },
  //     });
  //
  //     popup.open('delete_confirm');
  //   } catch (e) {
  //     const error = e as AxiosError;
  //     toast.error(`${error.response?.data.error}, please try again...`);
  //
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    const endMs = endDate.toDate().getTime();
    const currentMs = new Date().getTime();

    if (closedDate) {
      if (interval.current) {
        clearInterval(interval.current);
      }

      return;
    }

    if (currentMs + 1000 > endMs) {
      if (interval.current) {
        clearInterval(interval.current);
      }

      return;
    }

    setDiff(endMs - currentMs);

    interval.current = setInterval(() => {
      const currentMs = new Date().getTime();
      const diff = endMs - currentMs;
      const diffInMinutes = diff / 1000 / 60;

      if (diff < 0 && interval.current) {
        return clearInterval(interval.current);
      }

      setDiff(diff);

      if (diffInMinutes < 2) {
        return activateInterval(5000);
      }

      if (diffInMinutes < 5) {
        return activateInterval(10000);
      }

      if (diffInMinutes < 16) {
        return activateInterval(60000);
      }
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [from, closedDate, activateInterval]);

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>sale ends:</h4>
      <p className={styles.root__time}>
        {!!closedTime && closedTime.format('DD MMMM YYYY hh:mm A')}
        {!closedTime && endDate.format('DD MMMM YYYY hh:mm A')}
      </p>
      {!closedDate && (
        <div className={styles.root__wrapper}>
          <div className={styles.root__item}>
          <span className={styles.root__item_value}>
            {days}
          </span>
            <p className={styles.root__item_name}>Days</p>
          </div>
          <div className={styles.root__item}>
          <span className={styles.root__item_value}>
            {hours}
          </span>
            <p className={styles.root__item_name}>Hours</p>
          </div>
          <div className={styles.root__item}>
          <span className={styles.root__item_value}>
            {minutes}
          </span>
            <p className={styles.root__item_name}>Minutes</p>
          </div>
          <div className={styles.root__item}>
          <span className={styles.root__item_value}>
            {seconds}
          </span>
            <p className={styles.root__item_name}>Seconds</p>
          </div>
        </div>
      )}
      {/* {!closedDate && !!user && !availableForBuy && hours <= 6 && diff > 0 && ( */}
      {/*   <button onClick={close} className={styles.root__close}> */}
      {/*     Close auction */}
      {/*   </button> */}
      {/* )} */}
    </div>
  );
};

export default Countdown;
