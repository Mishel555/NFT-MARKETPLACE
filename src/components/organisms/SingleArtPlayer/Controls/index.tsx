import { HQIcon } from '@components/icons';
import Progress from '../Progress';

import MaximizeIcon from '@assets/icons/maximize.svg';
import styles from './style.module.scss';

interface IProps {
  currentTime: number;
  duration: number;
  isHQ?: boolean;
  isHQAvailable?: boolean;
  seek: (to: number) => void;
  maximize: () => void;
  toggleQuality?: () => void;
}

const Controls = ({
  currentTime,
  duration,
  isHQAvailable,
  isHQ,
  seek,
  maximize,
  toggleQuality,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__progress}>
      <Progress current={currentTime} duration={duration} seek={seek} />
    </div>
    <div className={styles.root__wrapper}>
      {isHQAvailable && toggleQuality && (
        <button className={styles.root__btn} onClick={toggleQuality}>
          <HQIcon fill={isHQ ? '#fff' : '#979493'} />
        </button>
      )}
      <button className={styles.root__btn} onClick={maximize}>
        <img alt="icon" src={MaximizeIcon} />
      </button>
    </div>
  </div>
);

export default Controls;
