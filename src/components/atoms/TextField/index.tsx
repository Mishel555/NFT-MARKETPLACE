import classNames from 'classnames';
import { ITextFieldProps } from '@constants/types';

import styles from './style.module.scss';

interface IPropTypes extends ITextFieldProps {
  error?: string;
  inputProps: {};
}

const TextField = ({
  label,
  inputProps,
  placeholder,
  maxLength,
  error,
  element,
}: IPropTypes) => (
  <div className={classNames(styles.root, !!error && styles.root_error)}>
    <label className={styles.root_label}>{label}</label>
    {(() => {
      switch (element) {
        case 'input': {
          return (
            <input
              className={styles.root_input}
              type="text"
              placeholder={placeholder}
              maxLength={maxLength}
              {...inputProps}
            />
          );
        }
        case 'textarea':
          return (
            <textarea
              className={styles.root_area}
              placeholder={placeholder}
              maxLength={maxLength}
              {...inputProps}
            />
          );
        default:
          return <p>Error case</p>;
      }
    })()}
    {!!error && (
      <p className={styles.root__error_message}>
        {error}
      </p>
    )}
  </div>
);

export default TextField;
