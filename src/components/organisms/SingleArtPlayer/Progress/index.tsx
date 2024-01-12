import { useCallback, useEffect, useMemo, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import { IModifiedThumbProps, IModifiedTrackProps } from '@constants/types';

import styles from './style.module.scss';

interface IProps {
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
    className={styles.track_root}
    style={{ ...props.style }}
  >
    <div
      ref={props.ref}
      className={styles.track}
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
    <div {...props} className={styles.thumb_root} style={{ ...props.style }}>
      <div className={styles.thumb} />
    </div>
  );
};

const Progress = ({
  current,
  duration,
  seek,
}: IProps) => {
  const max = useMemo(() => duration, [duration]);

  const [progress, setProgress] = useState<number>(current);
  const [isDragged, setIsDragged] = useState<boolean>(false);

  const changeProgress = useCallback((value: number[]) => {
    setProgress(value[0]);
  }, []);

  const afterProgressChange = useCallback(() => {
    seek(progress);
  }, [seek, progress]);

  useEffect(() => {
    if (!isDragged) {
      setProgress(current);
    }
  }, [current, isDragged]);

  return (
    <div className={styles.root}>
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
