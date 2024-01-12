import { forwardRef, MouseEvent } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './style.module.scss';

interface IProps {
  src: string;
  onLoad: () => void;
  poster?: string;
  onProgress?: () => void;
  onSeeked?: () => void;
  onSeeking?: () => void;
}

const Video = forwardRef<HTMLVideoElement, IProps>(({
  src,
  poster,
  onLoad,
  onSeeked,
  onProgress,
  onSeeking,
}, forwardeRef) => {
  const onContext = (e: MouseEvent<HTMLVideoElement>) => {
    e.preventDefault();
  };

  return (
    <video
      ref={forwardeRef}
      controlsList="nodownload"
      preload="metadata"
      playsInline
      poster={isMobile ? poster : undefined}
      controls={isMobile}
      onContextMenu={onContext}
      onLoadedMetadata={onLoad}
      onProgress={onProgress}
      onSeeked={onSeeked}
      onSeeking={onSeeking}
      className={styles.root}
    >
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
});

export default Video;
