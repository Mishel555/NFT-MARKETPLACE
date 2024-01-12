import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { IFee } from '@constants/types';

import ArrowIcon from '@assets/icons/arrow-down.svg';
import styles from './style.module.scss';

interface IProps {
  fee: IFee;
}

const WhiteFixedFee = ({ fee }: IProps) => {
  const {
    amounts,
    percents,
  } = useMemo(() => fee, [fee]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  const close = useCallback(() => setIsShow(false), []);
  const toggle = useCallback(() => setIsShow(prevState => !prevState), []);

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
    <div ref={rootRef} className={styles.root}>
      <button className={classNames(styles.root__btn, isShow && styles.root__btn_active)} onClick={toggle}>
        {amounts.length > 2 ? 'Three' : 'Two'}-step limit FEE
        <img src={ArrowIcon} alt="" />
      </button>
      {isShow && (
        <div className={styles.root__block}>
          <div className={styles.root__inner}>
            <p className={styles.root__title}>
              Amount Limit
            </p>
            <ul className={styles.root__info}>
              {amounts.map((amount, index) => (
                <li key={index}>
                  {amount - amounts[index + 1] ? (
                    index === amounts.length ? `${amount} - ${amounts[index + 1] + 1}$`
                      : `${amount !== 0 ? amount + 1 : amount} - ${amounts[index + 1]}$`
                  ) : `${amount + 1} - ∞`}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.root__inner}>
            <p className={styles.root__title}>
              Percentage
            </p>
            <ul className={classNames(styles.root__info, styles.root__info_bold)}>
              {percents.map((percent, index) => (
                <li key={index}>{percent}%</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhiteFixedFee;
