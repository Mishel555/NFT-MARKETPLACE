import { Range } from 'react-range';
import Track from './Track';
import Thumb from './Thumb';

import style from './style.module.scss';

interface IPropTypes {
  duration: number;
  value: number[];
  changeValue: (updatedValue: number[]) => void;
  afterValueChange: () => void;
}

const STEP = .01;
const MIN = 0;

const TempLine = ({
  duration,
  value,
  changeValue,
  afterValueChange,
}: IPropTypes) => (
  <div className={style.range_root} style={{ zIndex: !value.length ? -1000 : 1000 }}>
    <Range
      draggableTrack={!!value.length}
      values={value}
      step={STEP}
      min={MIN}
      max={duration}
      onChange={changeValue}
      onFinalChange={afterValueChange}
      renderTrack={({
        props,
        children,
      }) => (
        <Track
          props={props}
          value={value}
          min={MIN}
          max={duration}
        >
          {value.length ? children : null}
        </Track>
      )}
      renderThumb={({
        props,
        index,
      }) => (
        <Thumb
          key={index}
          index={index}
          props={props}
          values={value}
        />
      )}
    />
  </div>
);

export default TempLine;
