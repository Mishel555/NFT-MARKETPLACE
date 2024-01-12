import { forwardRef } from 'react';
import style from './style.module.scss';

interface propTypes {
  src: string;
  onLoad: () => void;
}

const Video = forwardRef<HTMLVideoElement, propTypes>(({ src, onLoad }, ref) => (
  <video
    ref={ref}
    className={style.editor_video}
    preload="auto"
    onLoadedData={onLoad}
  >
    <source src={src} />
    Your browser does not support the video tag.
  </video>
));

export default Video;
