import { FileIcon, HQIcon, StopAndPlay } from '@components/icons';
import TimeInput from './TimeInput';
import SpeedSelector from './SpeedSelector';

import MaximizeIcon from '@assets/icons/maximize.svg';
import styles from './style.module.scss';

interface IPropTypes {
  progress: number;
  duration: number;
  videoSpeed: number;
  allowedHQ: boolean;
  isHQ: boolean;
  allowOutSRC?: boolean;
  seek: (seconds: number) => void;
  toggle: () => void;
  toggleQuality: () => void;
  selectVideoSpeed: (speed: number) => void;
  maximize: () => void;
  openFileManager: () => void;
}

const Buttons = ({
  progress,
  duration,
  videoSpeed,
  allowOutSRC,
  allowedHQ,
  isHQ,
  toggle,
  toggleQuality,
  seek,
  selectVideoSpeed,
  maximize,
  openFileManager,
}: IPropTypes) => (
  <div className={styles.root}>
    <button className={styles.btn} onClick={toggle}>
      <StopAndPlay />
    </button>
    <TimeInput progress={progress} duration={duration} seek={seek} />
    <SpeedSelector speed={videoSpeed} selectVideoSpeed={selectVideoSpeed} />
    <div className={styles.right_part}>
      {allowOutSRC && (
        <button className={styles.btn} onClick={openFileManager}>
          <FileIcon fill="#979493" />
        </button>
      )}
      {allowedHQ && (
        <button className={styles.btn} onClick={toggleQuality}>
          <HQIcon fill={isHQ ? '#fff' : '#979493'} />
        </button>
      )}
      <button onClick={maximize} className={styles.btn}>
        <img alt="icon" src={MaximizeIcon} />
      </button>
    </div>
  </div>
);

export default Buttons;
