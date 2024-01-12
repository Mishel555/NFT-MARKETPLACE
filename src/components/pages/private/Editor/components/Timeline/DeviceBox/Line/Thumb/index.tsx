import { MouseEvent as ReactMouseEvent, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { IModifiedThumbProps } from '@constants/types';
import { useFormatSeconds } from '@hooks';
import { CloseIcon, EditPencil } from '@components/icons';

import style from './style.module.scss';

const Thumb = ({
  index,
  values,
  props,
  selected,
  isDragged,
  showTime = false,
  edit,
  remove,
}: IModifiedThumbProps) => {
  const toolRef = useRef<HTMLDivElement | null>(null);
  const focused = useRef<boolean>(false);

  const mouseDown = (e: ReactMouseEvent) => {
    if (toolRef.current?.contains((e.target) as Element)) {
      e.stopPropagation();
    }
  };

  const focusThumb = () => {
    focused.current = true;
    props.ref.current?.focus();
  };

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (focused.current && !props.ref.current?.contains(e.target as Element)) {
        focused.current = false;
        props.ref.current?.blur();
      }
    };

    document.addEventListener('click', listener, false);

    return () => document.removeEventListener('click', listener);
  }, [props]);

  return (
    <div {...props} style={{ ...props.style }} onMouseDown={mouseDown}>
      {selected && index !== undefined && Boolean(values) && index % 2 === 0 && (
        <div ref={toolRef} className={style.thumb_menu}>
          {!!remove && (
            <button onClick={() => remove(index)}>
              <CloseIcon width={24} height={24} fill="#ccc" />
              Remove
            </button>
          )}
          <div className={style.thumb_menu__divider} />
          {!!edit && (
            <button onClick={() => edit(index)}>
              <EditPencil fill="#ccc" />
              Edit
            </button>
          )}
        </div>
      )}
      <div
        onClick={focusThumb}
        className={style.thumb}
        style={{
          backgroundColor: isDragged ? 'black' : '#CCC',
        }}
      />
      {showTime && !!values && (
        <span className={classNames(style.thumb_time, selected && style.thumb_time_show)}>
          {`${useFormatSeconds(values[0])} - ${values[1] ? useFormatSeconds(values[1]) : ''}`}
        </span>
      )}
    </div>
  );
};

export default Thumb;
