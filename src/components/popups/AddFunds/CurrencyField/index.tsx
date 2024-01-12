import { ChangeEvent } from 'react';
import CurrencySelector from '../CurrencySelector';

import styles from './style.module.scss';

interface IProps {
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
    image?: string;
  }[];
  currencyName: string;
  activeOption: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCurrencyChange: (name: string, index: number) => void;
}

const CurrencyField = ({
  label,
  value,
  options,
  activeOption,
  currencyName,
  onChange,
  onCurrencyChange,
}: IProps) => (
  <div className={styles.root}>
    <h2 className={styles.root__title}>{label}</h2>
    <div className={styles.root__wrapper}>
      <input type="number" value={value} onChange={onChange} className={styles.root__input} />
      <CurrencySelector name={currencyName} active={activeOption} options={options} onChange={onCurrencyChange} />
    </div>
  </div>
);

export default CurrencyField;
