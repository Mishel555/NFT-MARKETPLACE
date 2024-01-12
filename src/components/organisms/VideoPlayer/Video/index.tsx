import { forwardRef, MouseEvent } from 'react';
import styles from './style.module.scss';

interface IPropTypes {
  src: string;
  onVideoLoad: () => void;
  onProgress?: () => void;
  onSeek?: () => void;
  onSeeked?: () => void;
}

const Video = forwardRef<HTMLVideoElement, IPropTypes>(({
  src,
  onVideoLoad,
  onSeek,
  onSeeked,
  onProgress,
}, forwardedRef) => {
  const onContext = (e: MouseEvent<HTMLVideoElement>) => {
    e.preventDefault();
  };

  return (
    <video
      className={styles.video}
      ref={forwardedRef}
      onLoadedData={onVideoLoad}
      preload="auto"
      controlsList="nodownload"
      onContextMenu={onContext}
      onSeeking={onSeek}
      onSeeked={onSeeked}
      onProgress={onProgress}
    >
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
});

export default Video;
