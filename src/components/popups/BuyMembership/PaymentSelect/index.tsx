import { ChangeEvent, useCallback } from 'react';
import styles from './style.module.scss';

interface IProps {
  availableMethods: {
    label: string;
    img: string;
  }[];
  selectedMethod: string;
  setMethod: (index: number) => void;
}

const PaymentSelect = ({
  availableMethods,
  selectedMethod,
  setMethod,
}: IProps) => {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      checked,
      value,
    } = e.target;

    if (checked && selectedMethod !== value) {
      setMethod(+id);
    }
  }, [selectedMethod, setMethod]);

  return (
    <div className={styles.root}>
      <div>
        <span className={styles.root__title}>
          Payment method
        </span>
        <ul className={styles.root__wrapper}>
          {availableMethods.map(({
            label,
            img,
          }, index) => (
            <li key={index} className={styles.root__wrapper__item}>
              <input
                type="radio"
                id={`${index}`}
                value={label}
                checked={label === selectedMethod}
                onChange={onChange}
              />
              <label htmlFor={`${index}`} className={styles.root__wrapper__label}>
                <img src={img} alt="method" />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentSelect;
