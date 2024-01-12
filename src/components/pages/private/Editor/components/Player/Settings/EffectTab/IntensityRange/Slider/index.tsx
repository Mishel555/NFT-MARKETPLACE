import { getTrackBackground, Range } from 'react-range';
import { IModifiedThumbProps, IModifiedTrackProps } from '@constants/types';

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
}: IModifiedThumbProps) => (
  <div {...props} className={style.thumb_root} style={{ ...props.style }}>
    <div
      className={style.thumb}
      style={{
        backgroundColor: isDragged ? '#EE6C40' : '#CCC',
      }}
    />
  </div>
);

const Slider = ({
  intensity,
  changeIntensity,
  afterIntensityChange,
  min = 0,
  max = 255,
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
      renderThumb={({
        props,
        isDragged,
        index,
      }) => (
        <Thumb key={index} props={props} isDragged={isDragged} />
      )}
    />
    <output id="output">
      {intensity}
    </output>
  </div>
);

export default Slider;
