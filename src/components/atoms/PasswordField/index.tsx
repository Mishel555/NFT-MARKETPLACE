import { useState } from 'react';
import classNames from 'classnames';
import { IPasswordFieldProps } from '@constants/types';

import EyeIconHide from '@assets/icons/eye-icon-hide.svg';
import EyeIconShow from '@assets/icons/eye-icon-show.svg';
import styles from './style.module.scss';

interface IPropTypes extends IPasswordFieldProps {
  error?: string;
  inputProps: {};
}

const Password = ({
  label,
  inputProps,
  error,
}: IPropTypes) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggle = () => setShowPassword(!showPassword);

  return (
    <div className={classNames(styles.root, !!error && styles.root_error)}>
      <label className={styles.root_label}>{label}</label>
      <div className={styles.root_group}>
        <input
          type={showPassword ? 'text' : 'password'}
          className={styles.root_input}
          placeholder=""
          {...inputProps}
        />
        <img
          src={showPassword ? EyeIconShow : EyeIconHide}
          alt="eye"
          className={styles.root_icon}
          onClick={toggle}
        />
      </div>
      {!!error && (
        <p className={styles.root__error_message}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Password;
