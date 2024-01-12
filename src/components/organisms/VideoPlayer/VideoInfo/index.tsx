import moment from 'moment';
import { formatBytes } from '@utils';
import { IVideoMetaInfo } from '@constants/types';

import styles from './style.module.scss';

interface IPropTypes {
  info: IVideoMetaInfo;
}

const VideoInfo = ({ info }: IPropTypes) => {
  const videoDuration = +info.duration;
  const resolution = `${info.width} X ${info.height}`;
  const size = formatBytes(info.size);
  const duration = videoDuration >= 3600 ? `${moment.utc(videoDuration * 1000).format('HH')} hours`
    : videoDuration >= 60 ? `${moment.utc(videoDuration * 1000).format('mm')} min`
      : `${moment.utc(videoDuration * 1000).format('ss')} sec`;

  return (
    <div className={styles.root}>
      <label className={styles.title}>
        Art Info
      </label>
      <div className={styles.info}>
        <p>Size: {size}; {duration}</p>
        <p>Resolution: {resolution}</p>
      </div>
    </div>
  );
};

export default VideoInfo;
