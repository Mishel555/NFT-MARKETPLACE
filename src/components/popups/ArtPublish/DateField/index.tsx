import { ChangeEvent, useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import styles from './style.module.scss';

interface IDate {
  DD: string;
  MM: string;
  YYYY: string;
  HH: string;
  mm: string;
}

interface IProps {
  error?: string;
  readonly?: boolean;
  defaultValue?: string;
  onDateChange: (dateString: string) => void;
}

const tomorrow = moment().add(1, 'day');

const FormField = ({ onDateChange, defaultValue, error, readonly }: IProps) => {
  const [date, setDate] = useState<IDate>({
    DD: tomorrow.format('DD'),
    MM: tomorrow.format('MM'),
    YYYY: tomorrow.format('YYYY'),
    HH: tomorrow.format('HH'),
    mm: tomorrow.format('mm'),
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numbers = /^[0-9\b]+$/;
    const { name, value } = e.target;

    if ((name === 'DD' || name === 'MM' || name === 'HH' || name === 'mm') && value.length > 2) return;

    if ((name === 'HH' && +value > 24) || (name === 'mm' && +value > 59)) return;

    if (value.length > 4) return;

    if (numbers.test(value) || value === '') {
      setDate(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    onDateChange(`${date.MM}/${date.DD}/${date.YYYY} ${date.HH}:${date.mm}`);
  }, [date, onDateChange]);

  useEffect(() => {
    if (defaultValue) {
      const date = moment(defaultValue);

      setDate({
        DD: date.format('DD'),
        MM: date.format('MM'),
        YYYY: date.format('YYYY'),
        HH: date.format('HH'),
        mm: date.format('mm'),
      });
    }
  }, [defaultValue]);

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>duration</h4>
      <div className={styles.root__wrapper}>
        <input
          name="DD"
          value={date.DD}
          placeholder="DD"
          readOnly={readonly}
          onChange={onChange}
          className={classNames(styles.root__input, styles.root__day)}
        />
        /
        <input
          name="MM"
          value={date.MM}
          placeholder="MM"
          readOnly={readonly}
          onChange={onChange}
          className={classNames(styles.root__input, styles.root__month)}
        />
        /
        <input
          name="YYYY"
          value={date.YYYY}
          placeholder="YYYY"
          readOnly={readonly}
          onChange={onChange}
          className={classNames(styles.root__input, styles.root__year)}
        />
        <input
          name="HH"
          value={date.HH}
          placeholder="HH"
          readOnly={readonly}
          onChange={onChange}
          className={classNames(styles.root__input, styles.root__day)}
        />
        :
        <input
          name="mm"
          value={date.mm}
          placeholder="mm"
          readOnly={readonly}
          onChange={onChange}
          className={classNames(styles.root__input, styles.root__day)}
        />
      </div>
      {!!error && (
        <p className={styles.root__error}>{error}</p>
      )}
    </div>
  );
};

export default FormField;
