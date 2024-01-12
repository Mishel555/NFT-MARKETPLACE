import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CaretArrowIcon } from '@components/icons';

import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  name: string;
  options: {
    value: string;
    label: string;
    image?: string;
  }[];
  active: number;
  onChange: (name: string, index: number) => void;
}

const CurrencySelector = ({
  name,
  options,
  active,
  onChange,
}: IProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [show, setShow] = useState<boolean>(false);

  const close = () => setShow(false);
  const toggle = () => setShow(prevState => !prevState);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      close();
    }
  }, []);

  const onSelect = (index: number) => {
    close();
    onChange(name, index);
  };

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button className={classNames(styles.root__btn, show && styles.root__btn_active)} onClick={toggle}>
        <div className={styles.root__name}>
          {!!options[active].image && (
            <img src={options[active].image} alt="currency" className={styles.root__icon} />
          )}
          <span className={styles.root__label}>{options[active].label}</span>
        </div>
        <CaretArrowIcon fill="#000" />
      </button>
      {show && (
        <ul className={classNames(styles.root__wrapper, show && animatedStyles.born_via_fade)}>
          {options.map(({
            value,
            label,
            image,
          }, index) => (
            <li key={value} className={styles.root__option}>
              <button disabled={active === index} onClick={() => onSelect(index)} className={styles.root__option_btn}>
                {!!image && (
                  <img src={image} alt="currency" className={styles.root__icon} />
                )}
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelector;
