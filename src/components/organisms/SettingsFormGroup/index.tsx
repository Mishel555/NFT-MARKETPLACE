import { Control, FieldErrors, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { IAccountDetailsFormValues, ISecurityFormValues, ISettingsFormField } from '@constants/types';

import styles from './styles.module.scss';

interface IProps {
  title: string;
  fields: ISettingsFormField[];
  control: Control<ISecurityFormValues | IAccountDetailsFormValues>;
  errors: FieldErrors<ISecurityFormValues | IAccountDetailsFormValues>;
}

const SettingsFormGroup = ({
  title,
  fields,
  control,
  errors,
}: IProps) => (
  <div className={styles.root}>
    <h2 className={styles.root__subtitle}>
      {title}
    </h2>
    <div className={styles.root_group}>
      {fields.map(({
        name,
        label,
        placeholder,
        type,
      }, index) => {
        const error = (() => {
          if (errors) {
            if (name.includes('.')) {
              const index = name.indexOf('.');
              const first = name.slice(0, index);
              const second = name.slice(index + 1);

              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              if (errors[first]) {
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                // @ts-ignore
                return errors[first][second]?.message;
              }
              return '';
            } else {
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              return errors[name]?.message;
            }
          }

          return '';
        })();

        return (
          <div
            key={index}
            className={classNames(styles.root_group__item, error && styles.root_group__item_error)}
          >
            <label className={styles.root_group__label}>
              {label}
            </label>
            <Controller
              name={name}
              control={control}
              render={({ field }) => type === 'area' ? (
                <textarea
                  {...field}
                  value={field.value as string ?? ''}
                  placeholder={placeholder}
                  className={classNames(styles.root_group__input, styles.root_group__area)}
                />
              ) : (
                <input
                  {...field}
                  value={field.value as string ?? ''}
                  type={type}
                  placeholder={placeholder}
                  className={styles.root_group__input}
                />
              )}
            />
            {!!error && (
              <span className={styles.root_group__item_message}>
                {error}
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default SettingsFormGroup;
