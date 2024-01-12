import { Fragment, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Video from './Video';
import Controls from './Controls';
import PlayButton from './PlayButton';

import styles from './style.module.scss';

interface IProps {
  src: string;
  poster?: string;
  hqSrc?: string | null;
  availableHQ?: boolean;
  onLoad?: () => void;
}

const SingleArtPlayer = ({
  src,
  hqSrc,
  poster,
  availableHQ,
  onLoad,
}: IProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [source, setSource] = useState<string>(src);
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(1);
  const [current, setCurrent] = useState<number>(0);
  const [isHQ, setIsHQ] = useState<boolean>(false);

  const maximizeVideo = (): void => {
    if (!videoRef.current) return;

    const videoElem = videoRef.current as unknown as HTMLMediaElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      webkitEnterFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (videoElem.requestFullscreen) {
      videoElem.requestFullscreen();
    } else if (videoElem.webkitEnterFullscreen) {
      videoElem.webkitEnterFullscreen(); // ios/safari
    } else if (videoElem.mozRequestFullScreen) {
      videoElem.mozRequestFullScreen(); // firefox
    } else if (videoElem.msRequestFullscreen) {
      videoElem.msRequestFullscreen(); // edge
    }
  };

  const onVideoLoad = () => {
    if (!videoRef.current) return;

    if (onLoad) {
      onLoad();
    }

    const duration = videoRef.current.duration;
    setDuration(Math.round(duration * 1000) / 1000);
  };

  const seekVideo = (seconds: number) => {
    if (videoRef.current) {
      const roundedSeconds = Math.round(seconds * 1000) / 1000;

      setCurrent(roundedSeconds);
      videoRef.current.currentTime = roundedSeconds;
    }
  };

  const toggleQuality = () => {
    if (!videoRef.current || !hqSrc) return;

    setIsPlayed(false);

    if (isHQ) {
      setIsHQ(false);
      videoRef.current.src = src;
      return setSource(src);
    }

    videoRef.current.src = hqSrc;
    setSource(hqSrc);
    setIsHQ(true);
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlayed) {
      videoRef.current.pause();

      if (videoInterval.current) {
        clearInterval(videoInterval.current);
      }
    } else {
      const interval = duration > 5000 ? 1000 : duration > 1000 ? 500 : duration > 600 ? 100 : 10;
      videoRef.current.play();

      videoInterval.current = setInterval(() => {
        if (!videoRef.current) return;

        const currentTime = videoRef.current.currentTime;
        const roundedSeconds = Math.round(currentTime * 1000) / 1000;

        if (videoInterval.current) {
          if (roundedSeconds === duration || roundedSeconds > duration) {
            videoRef.current.pause();

            setIsPlayed(false);
            clearInterval(videoInterval.current);
            return setCurrent(0);
          }
        }

        setCurrent(roundedSeconds);
      }, interval);
    }

    setIsPlayed(!isPlayed);
  };

  useEffect(() => () => {
    if (videoInterval.current) {
      clearInterval(videoInterval.current);
    }
  }, []);

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Video
        key={source}
        ref={videoRef}
        src={source}
        onLoad={onVideoLoad}
        {...poster && ({ poster })}
      />
      {!isMobile && (
        <Fragment>
          {isPlayed && (
            <Controls
              currentTime={current}
              duration={duration}
              seek={seekVideo}
              isHQAvailable={availableHQ}
              isHQ={isHQ}
              maximize={maximizeVideo}
              toggleQuality={toggleQuality}
            />
          )}
          {(!isPlayed || isHover) && (
            <PlayButton isPlayed={isPlayed} currentTime={current} toggle={toggleVideo} />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default SingleArtPlayer;
