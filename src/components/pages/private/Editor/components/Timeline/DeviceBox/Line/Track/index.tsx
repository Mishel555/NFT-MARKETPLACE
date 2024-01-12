import { MouseEvent, TouchEvent } from 'react';
import { getTrackBackground } from 'react-range';
import { IModifiedTrackProps } from '@constants/types';

import style from './style.module.scss';

const Track = ({
  props,
  value,
  children,
  min,
  max,
  colors,
  selectCurrentActuation,
}: IModifiedTrackProps) => {
  const selectActuation = (id: number | undefined): void => {
    if (selectCurrentActuation) {
      selectCurrentActuation(id);
    }
  };

  const detectInsideClick = (currentX: number): void => {
    if (Array.isArray(children)) {
      const actuationCount: number = children.length / 2;
      let mistakeCount = 0;

      children.forEach((child, index) => {
        if (index % 2 === 0) {
          const childPositions = [
            child?.props?.props?.ref?.current?.getBoundingClientRect(),
            children[index + 1]?.props?.props?.ref?.current?.getBoundingClientRect(),
          ];
          if (childPositions[0]?.x && childPositions[1]?.x) {
            if (childPositions[0]?.x < currentX && currentX < childPositions[1]?.x) {
              selectActuation(child?.props?.index / 2);
            } else {
              mistakeCount++;
              if (actuationCount === mistakeCount) {
                selectActuation(undefined);
              }
            }
          }
        }
      });
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    const currentX = e.clientX;

    detectInsideClick(currentX);

    props.onMouseDown(e);
  };

  const onTouchStart = (e: TouchEvent) => {
    const currentX = e.changedTouches[0].clientX;

    detectInsideClick(currentX);

    props.onTouchStart(e);
  };

  return (
    <div
      onMouseDown={value.length ? onMouseDown : undefined}
      onTouchStart={value.length ? onTouchStart : undefined}
      className={style.track_root}
      style={{ ...props.style }}
    >
      <div
        ref={props.ref}
        className={style.track}
        style={{
          background: getTrackBackground({
            values: value,
            colors: colors ? colors : ['#ccc'],
            min,
            max,
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Track;
