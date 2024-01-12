import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Range } from 'react-range';
import moment from 'moment';
import { useVideoManage, useFormatSeconds } from '@hooks';
import {
  IModifiedMarkProps,
  IModifiedThumbProps,
  IModifiedUntraceableTrackProps,
} from '@constants/types';
import MarkThumb from './MarkThumb';

import style from './style.module.scss';

const STEP = .5;
const MIN = 0;

const Track = ({
  props,
  children,
}: IModifiedUntraceableTrackProps) => (
  <div
    onMouseDown={props.onMouseDown}
    onTouchStart={props.onTouchStart}
    className={style.track_root}
    style={{ ...props.style }}
  >
    <div ref={props.ref} className={style.track}>
      {children}
    </div>
  </div>
);

const Mark = ({ props }: IModifiedMarkProps) => (
  <div {...props} className={style.mark} style={{ ...props.style }} />
);

const Thumb = ({
  props,
  setIsDragged,
  thumbHeight,
}: IModifiedThumbProps) => {
  useEffect(() => {
    if (setIsDragged) {
      setIsDragged();
    }
  }, [setIsDragged]);

  return (
    <div
      {...props}
      className={style.thumb_root}
      style={{
        ...props.style,
        height: thumbHeight ? `${thumbHeight}px` : '900px',
        position: 'absolute',
        top: thumbHeight ? `${thumbHeight / 2 - 20}px` : '430px',
      }}
    >
      <div>
        <MarkThumb height={thumbHeight ? thumbHeight : 900} />
      </div>
    </div>
  );
};

const FrameLine = ({ thumbHeight }: { thumbHeight: number }) => {
  const videoManager = useVideoManage();
  const current: number = videoManager.currentTime;
  const duration: number = videoManager.duration;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(current);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    if (!isDragged) {
      setProgress(current);
    }
  }, [current, isDragged]);

  const changeProgress = (value: number[]): void => {
    setProgress(value[0]);
  };

  const afterProgressChange = () => {
    videoManager.seekTo(progress);
  };

  const inputProgressChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const pattern = /^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]:?[0-5][0-9]:?[0-5][0-9]+$))/;
    const value = e.target.value;

    if (!isNaN(+(value.replaceAll(':', '')))) {
      if (value.match(pattern)) {
        const lastIndex = value.lastIndexOf(':');
        const miniSeconds = +parseInt(value.slice(lastIndex).replace(':', ''), 10) / 10;
        const seconds = moment.duration(value.slice(0, lastIndex)).asSeconds() + miniSeconds;

        if (seconds < duration) {
          videoManager.seekTo(seconds);
        }
      }
    } else {
      e.target.value = useFormatSeconds(progress);
    }
  };

  useEffect(() => {
    if (isInputFocused) {
      inputRef.current?.focus();
    }
  }, [isInputFocused]);

  return (
    <div className={style.root}>
      <div className={style.input_root}>
        <input
          key={!isInputFocused ? progress : null}
          ref={inputRef}
          className={style.time_input}
          type="text"
          maxLength={11}
          defaultValue={useFormatSeconds(progress)}
          onChange={inputProgressChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>
      <div className={style.line_box}>
        <Range
          values={[progress]}
          step={STEP}
          min={MIN}
          max={duration}
          onChange={changeProgress}
          onFinalChange={afterProgressChange}
          renderMark={({
            props,
            index,
          }) => (
            <Mark key={index} props={props} />
          )}
          renderTrack={({
            props,
            children,
          }) => (
            <Track props={props}>{children}</Track>
          )}
          renderThumb={({
            props,
            isDragged,
            index,
          }) => (
            <Thumb
              key={index + 10001}
              props={props}
              setIsDragged={() => setIsDragged(isDragged)}
              thumbHeight={thumbHeight}
            />
          )}
        />
      </div>
    </div>
  );
};

export default FrameLine;
