import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IFee } from '@constants/types';

import DownArrow from '@assets/icons/arrow-down-purple.svg';
import styles from './style.module.scss';

interface IPropTypes {
  fee: IFee;
  absolute?: boolean;
  defaultOpened?: boolean;
  setIsParentOpened?: (isOpened: boolean) => void;
}

const MultipleFee = ({
  fee,
  absolute,
  defaultOpened = false,
  setIsParentOpened,
}: IPropTypes) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpened);

  const toggle = (): void => setIsOpen(!isOpen);

  const listener = useCallback((e: MouseEvent) => {
    if (!boxRef.current?.contains(e.target as Element)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [listener]);

  useEffect(() => {
    if (setIsParentOpened) {
      setIsParentOpened(isOpen);
    }
  }, [isOpen, setIsParentOpened]);

  return (
    <div ref={boxRef} className={styles.root}>
      <button className={classNames(styles.root__header, isOpen && styles.root__header_active)} onClick={toggle}>
        <span>
          {fee.amounts.length > 2 ? 'Three' : 'Two'}-step limit FEE
        </span>
        <img alt="arrow" src={DownArrow} />
      </button>
      {isOpen && (
        <div className={classNames(styles.root__wrapper, absolute && styles.root__wrapper_absolute)}>
          <div>
            <span className={styles.root__wrapper_title}>
              Amount limit
            </span>
            <ul>
              {fee.amounts.map((amount, index) => (
                <li key={index} className={styles.root__amount}>
                  {amount - fee.amounts[index + 1] ? (
                    index === fee.amounts.length ? `${amount} - ${fee.amounts[index + 1] + 1}$`
                      : `${amount !== 0 ? amount + 1 : amount} - ${fee.amounts[index + 1]}$`
                  ) : (
                    <Fragment>
                      {amount + 1} - <p className={styles.root__infinity}>∞</p>
                    </Fragment>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.root__percentage}>
            <span className={styles.root__wrapper_title}>
              Percentage
            </span>
            <ul>
              {fee.percents.map((percent, index) => (
                <li key={index} className={styles.root__amount}>{percent}%</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleFee;
