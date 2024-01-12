import styles from './style.module.scss';
import { useFormatSeconds } from '@hooks';
import { useEffect, useState } from 'react';

interface IPropTypes {
  duration: number;
}

const Thumbs = ({ duration }: IPropTypes) => {
  const [seconds, setSeconds] = useState<string[]>([]);

  useEffect(() => {
    const seconds: number[] = [0];
    const labels: string[] = [];

    for (let i = 0; i < 3; i++) {
      seconds.push(Math.round(seconds[seconds.length - 1] + (duration / 4)));
    }
    seconds.push(Math.floor(duration));

    seconds.forEach(second => {
      const temp = useFormatSeconds(second);
      const index = temp.lastIndexOf(':');

      labels.push(temp.slice(0, index));
    });

    setSeconds(labels);
  }, [duration]);

  return (
    <div className={styles.root}>
      <div className={styles.thumb_root}>
        {Array.from(Array(100).keys()).map(value => (
          <div key={value} className={styles.thumb} />
        ))}
      </div>
      <div className={styles.seconds_root}>
        {seconds.map((second, index) => (
          <span key={index}>{second}</span>
        ))}
      </div>
    </div>
  );
};

export default Thumbs;
