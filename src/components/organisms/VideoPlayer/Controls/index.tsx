import Progress from './Progress';
import Thumbs from './Thumbs';
import Buttons from './Buttons';

import styles from './style.module.scss';

interface IPropTypes {
  current: number;
  duration: number;
  videoSpeed: number;
  allowedHQ: boolean;
  isHQ: boolean;
  allowOutSRC?: boolean;
  toggle: () => void;
  toggleQuality: () => void;
  seek: (seconds: number) => void;
  selectVideoSpeed: (speed: number) => void;
  maximizeVideo: () => void;
  openFileManager: () => void;
}

const Controls = ({
  current,
  duration,
  videoSpeed,
  allowedHQ,
  isHQ,
  allowOutSRC,
  toggle,
  toggleQuality,
  seek,
  selectVideoSpeed,
  maximizeVideo,
  openFileManager,
}: IPropTypes) => (
  <div className={styles.root}>
    <Progress
      current={current}
      duration={duration}
      seek={seek}
    />
    <Thumbs duration={duration} />
    <Buttons
      progress={current}
      duration={duration}
      videoSpeed={videoSpeed}
      allowedHQ={allowedHQ}
      allowOutSRC={allowOutSRC}
      isHQ={isHQ}
      toggle={toggle}
      toggleQuality={toggleQuality}
      seek={seek}
      selectVideoSpeed={selectVideoSpeed}
      maximize={maximizeVideo}
      openFileManager={openFileManager}
    />
  </div>
);

export default Controls;
