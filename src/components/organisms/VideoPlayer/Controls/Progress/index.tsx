import { useEffect, useMemo, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { IModifiedTrackProps, IModifiedThumbProps } from '@constants/types';

import style from './style.module.scss';

interface IPropTypes {
  current: number;
  duration: number;
  seek: (seconds: number) => void;
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
      <div className={style.thumb} />
    </div>
  );
};

const Progress = ({
  current,
  duration,
  seek,
}: IPropTypes) => {
  const max = useMemo(() => duration, [duration]);

  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(current);

  const changeProgress = (value: number[]): void => {
    setProgress(value[0]);
  };

  const afterProgressChange = () => {
    seek(progress);
  };

  useEffect(() => {
    if (!isDragged) {
      setProgress(current);
    }
  }, [current, isDragged]);

  return (
    <div className={style.range_root}>
      <Range
        min={0}
        max={max}
        step={0.1}
        values={[progress]}
        onChange={changeProgress}
        onFinalChange={afterProgressChange}
        renderTrack={(
          {
            props,
            children,
          },
        ) => (
          <Track
            props={props}
            value={[progress]}
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
