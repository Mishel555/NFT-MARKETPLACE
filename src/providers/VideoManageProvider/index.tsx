import { useEffect, useState, useMemo, ReactNode, useCallback } from 'react';
import { VideoManageContext } from '@contexts/VideoManageContext';

interface propTypes {
  children?: ReactNode;
}

const VideoManageProvider = ({ children }: propTypes) => {
  const [ref, setRef] = useState<HTMLVideoElement | null>(null); // ref current
  const [isPlayed, setIsPlayed] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(100);
  const [intervalState, setIntervalState] = useState(1000);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [source, setSource] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(1);

  const detectCurrentTime = useCallback(() => setCurrentTime(ref?.currentTime || 0), [ref]);
  const toggleVideo = useCallback(() => isLoaded && setIsPlayed(!isPlayed), [isLoaded, isPlayed]);

  const seekVideo = useCallback((time: number) => {
    if (ref) {
      ref.currentTime = time;
      detectCurrentTime();
    }
  }, [ref, detectCurrentTime]);

  const onVideoLoad = useCallback(() => {
    if (ref) {
      setIsLoaded(true);
      setDuration(ref.duration);
    }
  }, [ref]);

  const revertValues = useCallback(() => {
    setRef(null);
    setIsPlayed(true);
    setDuration(100);
    setIntervalState(1000);
    setCurrentTime(0);
    setIsLoaded(false);
    setSource(null);
    setSpeed(1);
  }, []);

  useEffect(() => {
    if (ref) {
      if (isPlayed) {
        ref.pause();
      } else {
        ref.play();
      }
      setCurrentTime(ref.currentTime);
    }
  }, [ref, isPlayed]);

  useEffect(() => {
    const inEditorPage = window.location.pathname === '/editor';

    const interval = inEditorPage && !isPlayed && window.setInterval(() => {
      detectCurrentTime();
    }, intervalState);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [intervalState, detectCurrentTime, isPlayed]);

  useEffect(() => {
    if (ref) {
      if (speed === 1) {
        ref.playbackRate = 1.0;
      } else {
      }
      ref.playbackRate = speed;
    }
  }, [speed, ref]);

  useEffect(() => {
    if (duration > 180) {
      setIntervalState(100);
    } else {
      setIntervalState(10);
    }
  }, [duration]);

  const contextValue = useMemo(() => ({
    duration,
    currentTime,
    isLoaded,
    source,
    ref,
    speed,
    setRef: (current: HTMLVideoElement | null) => setRef(current),
    seekTo: seekVideo,
    toggleVideo,
    onVideoLoad,
    revertValues,
    setSource: (src: string) => setSource(src),
    setSpeed: (speed: number) => setSpeed(speed),
  }), [
    ref,
    source,
    duration,
    currentTime,
    isLoaded,
    speed,
    setRef,
    seekVideo,
    toggleVideo,
    onVideoLoad,
    revertValues,
    setSource,
    setSpeed,
  ]);

  return (
    <VideoManageContext.Provider value={contextValue}>
      {children}
    </VideoManageContext.Provider>
  );
};

export default VideoManageProvider;
