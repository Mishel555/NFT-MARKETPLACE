import { Control, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { AvailableBannersFormNames, IBannersFormValues } from '@constants/types';

import styles from './style.module.scss';

interface IProps {
  control: Control<IBannersFormValues>;
  name: AvailableBannersFormNames;
  label: string;
  element: 'input' | 'area';
}

const TextField = ({
  control,
  label,
  name,
  element,
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
          <div className={styles.root__item}>
            {element === 'area' ? (
              <textarea
                {...field}
                value={field.value as string ?? ''}
                className={classNames(styles.root__input, styles.root__area)}
              />
            ) : (
              <input
                {...field}
                value={field.value as string ?? ''}
                className={styles.root__input}
              />
            )}
            {!!error && (
              <h6 className={styles.root__error}>{error.message}</h6>
            )}
          </div>
        )}
      />
    </div>

  </div>
);

export default TextField;
