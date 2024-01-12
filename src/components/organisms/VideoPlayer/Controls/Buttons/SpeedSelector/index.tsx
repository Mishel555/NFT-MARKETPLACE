import { useEffect, useRef, useState } from 'react';

import ArrowIcon from '@assets/icons/arrow-down-light.svg';
import styles from './style.module.scss';

interface IPropTypes {
  speed: number;
  selectVideoSpeed: (speed: number) => void;
}

const SpeedSelector = ({ speed, selectVideoSpeed }: IPropTypes) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  const setSpeed = (speed: number) => {
    selectVideoSpeed(speed);
    setIsShow(false);
  };

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Element)) {
        setIsShow(false);
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  return (
    <div ref={boxRef} className={styles.root}>
      <div className={styles.selector_box} onClick={() => setIsShow(!isShow)}>
        <span>{speed} X</span>
        <button className={styles.open_btn}>
          <img alt="icon" src={ArrowIcon} />
        </button>
      </div>
      {isShow && (
        <div className={styles.drop_menu}>
          <ul>
            <li onClick={() => setSpeed(1)}>
              1 X
            </li>
            <li onClick={() => setSpeed(0.5)}>
              0.5 X
            </li>
            <li onClick={() => setSpeed(0.25)}>
              0.25 X
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpeedSelector;
