import { useState } from 'react';
import classNames from 'classnames';
import { CaretArrowIcon } from '@components/icons';

import EthIcon from '@assets/icons/black-eth-icon.svg';
import UsdIcon from '@assets/icons/usd-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  name: string;
  onChange: (name: string, value: 'ETH' | 'USD') => void;
}

const AVAILABLE_CURRENCIES = [
  {
    name: 'ETH',
    image: EthIcon,
  },
  {
    name: 'USD',
    image: UsdIcon,
  },
];

const CurrencySelect = ({
  name,
  onChange,
}: IProps) => {
  const [currency, setCurrency] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);

  const toggle = () => setShow(prevState => !prevState);

  const selectCurrency = (index: number) => {
    setCurrency(index);
    setShow(false);
    onChange(name, AVAILABLE_CURRENCIES[index].name as 'ETH' | 'USD');
  };

  return (
    <div className={styles.root}>
      <button type="button" onClick={toggle} className={classNames(styles.root__btn, styles.root__btn_active)}>
        <div className={styles.root__item}>
          <img src={AVAILABLE_CURRENCIES[currency].image} alt="currency" className={styles.root__img} />
          <span>{AVAILABLE_CURRENCIES[currency].name}</span>
        </div>
        <CaretArrowIcon fill="#000" />
      </button>
      {show && (
        <ul className={styles.root__wrapper}>
          {AVAILABLE_CURRENCIES.map(({
            name,
            image,
          }, index) => index !== currency && (
            <li key={index} onClick={() => selectCurrency(index)} className={styles.root__item}>
              <img src={image} alt="currency" className={styles.root__img} />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelect;
