import moment from 'moment';
import { CirclePlay, CirclePause } from '@components/icons';

import styles from './style.module.scss';

interface IProps {
  toggle: () => void;
  isPlayed: boolean;
  currentTime: number;
}

const PlayButton = ({
  toggle,
  isPlayed,
  currentTime,
}: IProps) => (
  <div className={styles.root}>
    <button
      onClick={toggle}
      className={styles.root__toggle}
    >
      {isPlayed ? <CirclePause /> : <CirclePlay />}
    </button>
    <p className={styles.root__time}>
      - {moment.utc(currentTime * 1000).format('HH:mm:ss')}
    </p>
  </div>
);

export default PlayButton;
