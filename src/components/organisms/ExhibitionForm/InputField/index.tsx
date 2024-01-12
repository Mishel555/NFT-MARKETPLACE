import { ChangeEvent, useCallback, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { IExhibitionFormValues } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  control: Control<IExhibitionFormValues>;
  name: keyof IExhibitionFormValues;
  type?: string;
  placeholder?: string;
  label?: string;
}

const InputField = ({
  control,
  name,
  type = 'string',
  placeholder,
  label,
}: IProps) => {
  const previousValue = useRef<string>('');

  const validateValue = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = +e.target.value;

    if (name === 'day' || name === 'month' || name === 'year') {
      if (isNaN(value) || e.target.value.includes('.')) {
        e.target.value = previousValue.current;
        return;
      }
    }

    if (name === 'day') {
      if (value > 31) {
        e.target.value = previousValue.current;
        return;
      }
    }

    if (name === 'month') {
      if (value > 12) {
        e.target.value = previousValue.current;
        return;
      }
    }

    previousValue.current = value.toString();
  }, [name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        formState: { errors },
      }) => (
        <div className={styles.root}>
          {!!label && (
            <p className={styles.root__label}>{label}</p>
          )}
          {type === 'textarea' ? (
            <textarea
              placeholder={placeholder}
              {...field}
              value={field.value || ''}
              onChange={(e) => {
                validateValue(e);
                field.onChange(e);
              }}
              className={styles.root__area}
            />
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value || ''}
              onChange={(e) => {
                validateValue(e);
                field.onChange(e);
              }}
              className={styles.root__input}
            />
          )}
          {errors[name] && <span className={styles.root__message}>{errors[name]?.message}</span>}
        </div>
      )}
    />
  );
};

export default InputField;
