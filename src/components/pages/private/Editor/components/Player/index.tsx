import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useVideoManage } from '@hooks';
import Video from './Video';
import Controls from './Controls';
import Settings from './Settings';

import style from './style.module.scss';

interface IPropTypes {
  renderState: number | null;
  forceRender: () => void;
}

const Player = ({
  renderState,
  forceRender,
}: IPropTypes) => {
  const videoManager = useVideoManage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = videoManager.source;

  const duration: number = useMemo(() => (videoManager.duration), [videoManager]);
  const progress: number = videoManager.currentTime;

  const seekTo = (seconds: number): void => videoManager.seekTo(seconds);

  useEffect(() => {
    if (videoRef.current) {
      videoManager.setRef(videoRef.current);
    }
  }, [videoManager, videoRef]);

  return (
    <div className={style.root}>
      <div className={style.video_section}>
        {src ? (
          <Fragment>
            <Video
              src={src}
              ref={videoRef}
              onLoad={videoManager.onVideoLoad}
            />
            <Controls
              key={renderState}
              forceRender={forceRender}
              toggle={videoManager.toggleVideo}
              duration={duration}
              progress={progress}
              seekTo={seekTo}
            />
          </Fragment>
        ) : null}
      </div>
      <div className={style.setting_section}>
        <Settings key={renderState} forceRender={forceRender} />
      </div>
    </div>
  );
};

export default Player;
