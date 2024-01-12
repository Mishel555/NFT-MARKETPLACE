import { useEffect, useMemo, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { IModifiedThumbProps, IModifiedTrackProps } from '@constants/types';

import style from './style.module.scss';

interface propTypes {
  duration: number;
  current: number;
  seekTo: (seconds: number) => void;
}

const Track = ({
  props,
  children,
  value,
  min,
  max,
}: IModifiedTrackProps) => (
  <div
    onMouseDown={props.onMouseDown}
    onTouchStart={props.onTouchStart}
    className={style.track_root}
    style={{ ...props.style }}
  >
    <div
      ref={props.ref}
      className={style.track}
      style={{
        background: getTrackBackground({
          values: value,
          colors: ['#fff', '#ccc'],
          min,
          max,
        }),
      }}
    >
      {children}
    </div>
  </div>
);

const Thumb = ({
  props,
  isDragged,
  setIsDragged,
}: IModifiedThumbProps) => {
  useEffect(() => {
    if (setIsDragged) {
      setIsDragged();
    }
  }, [isDragged, setIsDragged]);

  return (
    <div {...props} className={style.thumb_root} style={{ ...props.style }}>
      <div
        className={style.thumb}
        style={{
          backgroundColor: isDragged ? '#EE6C40' : '#CCC',
        }}
      />
    </div>
  );
};

const Progress = ({
  duration,
  current,
  seekTo,
}: propTypes) => {
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [progress, setProgress] = useState<number[]>([current]);
  const max = useMemo(() => duration, [duration]);

  useEffect(() => {
    if (!isDragged) {
      setProgress([current]);
    }
  }, [current, isDragged]);

  const changeProgress = (value: number[]): void => {
    setProgress(value);
  };

  const afterProgressChange = () => {
    seekTo(progress[0]);
  };

  return (
    <div className={style.range_root}>
      <Range
        min={0}
        max={max}
        values={progress}
        step={0.1}
        onChange={changeProgress}
        onFinalChange={afterProgressChange}
        renderTrack={({
          props,
          children,
        }) => (
          <Track
            props={props}
            value={progress}
            min={0}
            max={max}
          >
            {children}
          </Track>
        )}
        renderThumb={({
          props,
          isDragged,
          index,
        }) => (
          <Thumb key={index} props={props} isDragged={isDragged} setIsDragged={() => setIsDragged(isDragged)} />
        )}
      />
    </div>
  );
};

export default Progress;
