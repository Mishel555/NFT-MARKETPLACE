import { Range, getTrackBackground } from 'react-range';
import { IModifiedMarkProps, IModifiedThumbProps, IModifiedTrackProps } from '@constants/types';

import style from '../style.module.scss';

interface IPropTypes {
  intensity: number;
  changeIntensity: (data: number[]) => void;
  afterIntensityChange: () => void;
  min?: number;
  max?: number;
  step?: number;
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
          colors: ['#fff', '#5C5551'],
          min,
          max,
        }),
      }}
    >
      {children}
    </div>
  </div>
);

const Mark = ({
  props,
}: IModifiedMarkProps) => (
  <div {...props} className={style.mark} />
);

const Thumb = ({
  props,
  isDragged,
}: IModifiedThumbProps) => (
  <div {...props} className={style.thumb_root} style={{ ...props.style }}>
    <div
      className={style.thumb}
      style={{
        backgroundColor: isDragged ? '#5C5551' : '#fff',
      }}
    />
  </div>
);

const Marker = ({
  intensity,
  changeIntensity,
  afterIntensityChange,
  min = 1,
  max = 3,
  step = 1,
}: IPropTypes) => (
  <div className={style.range_root}>
    <Range
      min={min}
      max={max}
      step={step}
      values={[intensity]}
      onChange={changeIntensity}
      onFinalChange={afterIntensityChange}
      renderTrack={({
        props,
        children,
      }) => (
        <Track
          props={props}
          value={[intensity]}
          min={min}
          max={max}
        >
          {children}
        </Track>
      )}
      renderMark={({
        props,
        index,
      }) => (
        <Mark key={index + 2000} props={props} />
      )}
      renderThumb={({
        props,
        isDragged,
        index,
      }) => (
        <Thumb key={index} props={props} isDragged={isDragged} />
      )}
    />
    <div className={style.mark_meta}>
      <span>Low</span>
      <span>Middle</span>
      <span>Strong</span>
    </div>
  </div>
);

export default Marker;
