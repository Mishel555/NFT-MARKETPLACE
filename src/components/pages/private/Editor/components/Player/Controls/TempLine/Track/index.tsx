import { getTrackBackground } from 'react-range';
import { IModifiedTrackProps } from '@constants/types';

import style from './style.module.scss';

const Track = ({
  props,
  value,
  children,
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
          colors: ['rgba(0, 0, 0, 0)', '#7A52F4', 'rgba(0, 0, 0, 0)'],
          min,
          max,
        }),
      }}
    >
      {children}
    </div>
  </div>
);

export default Track;
