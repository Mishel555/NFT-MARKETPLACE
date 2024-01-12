import { Control, Controller } from 'react-hook-form';
import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  name: string;
  label: string;
  // eslint-disable-next-line
  control: Control<any>;
  type: 'input' | 'area';
  placeholder?: string;
}

const TextField = ({
  type,
  name,
  label,
  control,
  placeholder,
}: IProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({
      field,
      fieldState: { error },
    }) => (
      <div className={styles.root}>
        <p className={styles.root__label}>{label}</p>
        {type === 'area' ? (
          <textarea
            {...field}
            placeholder={placeholder}
            className={classNames(styles.root__field, styles.root__area)}
          />
        ) : (
          <input {...field} placeholder={placeholder} className={styles.root__field} />
        )}
        {error && (
          <span className={styles.root__error}>{error.message}</span>
        )}
      </div>
    )}
  />
);

export default TextField;
