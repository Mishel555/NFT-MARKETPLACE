import { Fragment } from 'react';
import { Control, Controller } from 'react-hook-form';
import { AvailableBannersFormNames, IBannersFormValues } from '@constants/types';

import styles from './style.module.scss';

interface IProps {
  label: string;
  name: AvailableBannersFormNames;
  control: Control<IBannersFormValues>;
}

const DateField = ({
  name,
  label,
  control,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__wrapper}>
      <span className={styles.root__title}>{label}</span>
      <Controller
        name={name}
        control={control}
        render={({
          field,
          fieldState: { error },
        }) => (
          <Fragment>
            <input
              {...field}
              type="datetime-local"
              value={field.value as string ?? ''}
              className={styles.root__input}
            />
            {!!error && (
              <h6 className={styles.root__error}>{error.message}</h6>
            )}
          </Fragment>
        )}
      />
    </div>
  </div>
);

export default DateField;
