import { useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import moment from 'moment';
import styles from './style.module.scss';

interface IProps {
  date: string;
  color?: string;
  children: ReactNode;
}

const Countdown = ({ date, children }: IProps) => {
  const endDate = useMemo(() => moment(date), [date]);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [diff, setDiff] = useState<number>(0);

  const { days, hours, minutes, seconds } = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };

  useEffect(() => {
    const endMs = endDate.toDate().getTime();
    const currentMs = new Date().getTime();

    if (currentMs > endMs) {
      if (interval.current) {
        clearInterval(interval.current);
      }

      return;
    }

    setDiff(endMs - currentMs);

    interval.current = setInterval(() => {
      const currentMs = new Date().getTime();
      const diff = endMs - currentMs;

      setDiff(diff);
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [endDate]);

  if (!diff) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <div className={styles.root__item}>
          <span className={styles.root__number}>{days}</span>
          <p className={styles.root__label}>Days</p>
        </div>
        <div className={styles.root__item}>
          <span className={styles.root__number}>{hours}</span>
          <p className={styles.root__label}>Hours</p>
        </div>
        <div className={styles.root__item}>
          <span className={styles.root__number}>{minutes}</span>
          <p className={styles.root__label}>Mins</p>
        </div>
        <div className={styles.root__item}>
          <span className={styles.root__number}>{seconds}</span>
          <p className={styles.root__label}>Secs</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Countdown;
