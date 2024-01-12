import { useEffect, useRef, useState } from 'react';
import { IActuationType, IDevicesType, IProfileArtType, IVideoMetaInfo } from '@constants/types';
import { useDropzone } from 'react-dropzone';
import { Oval } from 'react-loading-icons';
import { useAuth } from '@hooks';
import api from '@services/api';
import Video from './Video';
import Controls from './Controls';
import ActuationLogger from './ActuationLogger';
import VideoInfo from './VideoInfo';

import styles from './style.module.scss';

interface IProps {
  id?: string;
  src: string;
  actuations?: IActuationType[] | IDevicesType[];
  actuationType?: 'back' | 'front';
  info?: IVideoMetaInfo;
  allowOutSRC?: boolean;
}

const VideoPlayer = ({
  id,
  src,
  info,
  actuations,
  actuationType,
  allowOutSRC,
}: IProps) => {
  const isSend = localStorage.getItem('isRoomPc') || localStorage.getItem('IsRoomPc');
  const { user, token } = useAuth();
  const { open, getInputProps, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: { 'image/*': ['.art'] },
  });

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevPosition = useRef<number>(0);

  const [localActuations, setLocalActuations] = useState<IActuationType[] | IDevicesType[]>(actuations || []);
  const [videoSrc, setVideoSrc] = useState<string>(src);
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [allowHQ, setAllowHQ] = useState<boolean>(false);
  const [isHQ, setIsHQ] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onVideoLoad = (): void => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;

      if (duration > prevPosition.current) {
        videoRef.current.currentTime = prevPosition.current;
      }

      if (isPlayed) {
        videoRef.current.play();
      }

      const roundedDuration = Math.round(duration * 1000) / 1000;

      setDuration(roundedDuration);
    }
  };

  const maximizeVideo = (): void => {
    if (videoRef.current) {
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
    }
  };

  const togglePlay = (): void => {
    if (isPlayed) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }

    setIsPlayed(!isPlayed);
  };

  const toggleQuality = () => {
    if (id) {
      prevPosition.current = current;
      setIsHQ(!isHQ);
    }
  };

  const seekTo = (seconds: number): void => {
    if (videoRef.current) {
      const roundedSeconds = Math.round(seconds * 1000) / 1000;


      setCurrent(roundedSeconds);
      videoRef.current.currentTime = roundedSeconds;
    }
  };

  const selectVideoSpeed = (speed: number): void => {
    if (videoRef.current) {
      if (speed === 1) {
        videoRef.current.playbackRate = 1.0;
      } else {
        videoRef.current.playbackRate = speed;
      }

      setVideoSpeed(speed);
    }
  };

  const openFileManager = () => {
    open();
  };

  useEffect(() => {
    if (!user || !token) {
      return;
    }

    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      api.art.openFile(formData, token).then(({ data }) => {
        if (videoRef.current) {
          setLocalActuations(data.actuations);
          setVideoSrc(`https://room.artinspace.art${data.src}`);

          videoRef.current.src = `https://room.artinspace.art${data.src}`;
        }

        setLoading(false);
      });
    }
  }, [acceptedFiles, token, user]);

  useEffect(() => {
    if (actuations?.length) {
      setLocalActuations(actuations);
    }
  }, [actuations]);

  useEffect(() => {
    const getHQSrc = async () => {
      try {
        if (id && videoRef.current) {
          const { data } = await api.art.getHQUrl(id);

          videoRef.current.src = data.url;
          setVideoSrc(data.url);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (isHQ && id) {
      getHQSrc();
    } else {
      if (videoRef.current) {
        videoRef.current.src = src;
        setVideoSrc(src);
      }
    }
  }, [id, src, isHQ]);

  useEffect(() => {
    const interval = duration > 5000 ? 1000 : duration > 1000 ? 500 : duration > 600 ? 100 : 10;

    timer.current = setInterval(() => {
      if (videoRef.current && timer.current) {
        const video = videoRef.current;
        const roundedSeconds = video.currentTime;

        if (isPlayed) {
          setCurrent(roundedSeconds);
        } else {
          clearInterval(timer.current);
        }
      }
    }, interval);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isPlayed, duration]);

  useEffect(() => {
    if (!user) {
      return setAllowHQ(false);
    }

    if (id && user) {
      api.art.getSingle(id).then(({ data }) => {
        const art = data as IProfileArtType;

        if (user.role.name === 'admin') {
          return setAllowHQ(true);
        }

        if (art.artist['_id'] === user['_id']) {
          return setAllowHQ(true);
        }

        if (art.artist.gallery && art.artist.gallery['_id'] === user['_id']) {
          return setAllowHQ(true);
        }

        const ownedIndex = art.copies?.findIndex(nft => nft.owner === user['_id']) || -1;
        setAllowHQ(ownedIndex >= 0);
      }).catch(e => console.log(e));
    }
  }, [id, user]);

  return (
    <div className={styles.root}>
      <Video ref={videoRef} src={videoSrc} onVideoLoad={onVideoLoad} />
      <Controls
        isHQ={isHQ}
        current={current}
        duration={duration}
        allowedHQ={allowHQ}
        videoSpeed={videoSpeed}
        allowOutSRC={allowOutSRC}
        toggle={togglePlay}
        toggleQuality={toggleQuality}
        seek={seekTo}
        selectVideoSpeed={selectVideoSpeed}
        maximizeVideo={maximizeVideo}
        openFileManager={openFileManager}
      />
      <div className={styles.meta_root}>
        {!!localActuations && !!actuationType && (
          <ActuationLogger
            isPlayed={isPlayed}
            sendToDevices={!!isSend}
            currentTime={current}
            actuations={localActuations}
            actuationType={actuationType}
          />
        )}
        {!!info && (
          <VideoInfo info={info} />
        )}
        {allowOutSRC && (
          <input {...getInputProps()} />
        )}
      </div>
      {loading && (
        <div className={styles.root__loader}>
          <Oval height="3em" stroke="#fff" />
        </div>
      )}

    </div>
  );
};

export default VideoPlayer;
