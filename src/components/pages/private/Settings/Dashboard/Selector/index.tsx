import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CaretArrowIcon } from '@components/icons';

import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  data: string[];
  selectedData: number;
  changeData: (dataIndex: number) => void;
}

const Selector = ({
  data,
  selectedData,
  changeData,
}: IProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggle = useCallback(() => setIsShow(prevState => !prevState), []);
  const close = useCallback(() => setIsShow(false), []);

  const onClick = useCallback((index: number) => {
    close();
    changeData(index);
  }, [changeData, close]);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      close();
    }
  }, [close]);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div ref={rootRef} className={classNames(styles.root, isShow && styles.root_active)}>
      <button onClick={toggle} className={classNames(styles.root__toggle, isShow && styles.root__toggle_active)}>
        <h1 className={styles.root__current}>
          {data[selectedData]}
        </h1>
        {data.length > 1 && (
          <CaretArrowIcon fill="#000" />
        )}
      </button>
      {isShow && data.length > 1 && (
        <div className={classNames(styles.root__wrapper, animatedStyles.born_via_fade)}>
          {data.map((chart, index) => index !== selectedData && (
            <button key={index} onClick={() => onClick(index)} className={styles.root__wrapper_item}>
              {chart}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;
