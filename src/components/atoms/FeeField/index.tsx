import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import styles from './style.module.scss';

interface IProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  setValue?: UseFormSetValue<FieldValues>;
  value?: number;
  minValue?: number;
}

const FeeField = ({
  register,
  name,
  value,
  setValue,
  minValue,
}: IProps) => {
  const maxValue = useMemo(() => name.includes('percent') ? 100 : 9999999999, [name]);
  const [inputValue, setInputValue] = useState<number>(minValue || 1);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (!setValue) {
      return;
    }

    if (minValue && minValue > value) {
      setValue(name, inputValue);
      setInputValue(inputValue);
      return;
    }

    if (value < 1) {
      setValue(name, inputValue);
      setInputValue(minValue || 1);
      return;
    }

    if (value > maxValue) {
      setValue(name, inputValue);
    } else {
      setValue(name, value);
      setInputValue(value);
    }
  };

  useEffect(() => {
    if (value !== undefined && setValue) {
      setValue(name, value);
    }
  }, [name, value, setValue]);

  return (
    <input
      className={styles.root}
      type="number"
      defaultValue={1}
      {...register(name, {
        valueAsNumber: true,
      })}
      onChange={onInputChange}
    />
  );
};

export default FeeField;
