import { ChangeEvent, useState } from 'react';

import EnterIcon from '@assets/icons/enter-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  role: string;
  addUser: (user: string) => void;
}

const UserForm = ({
  role,
  addUser,
}: IProps) => {
  const [value, setValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const submit = () => {
    setErrorMessage(null);

    if (!value) {
      return setErrorMessage('Name is required field');
    }

    if (value.length > 50) {
      return setErrorMessage('Max length of name is 50');
    }

    addUser(value);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>Add your {role}</h1>
      <div className={styles.root__inputBar}>
        <input onChange={onChange} value={value} className={styles.root__inputBar_input} />
        <button type="button" onClick={submit} className={styles.root__inputBar_submit}>
          <img src={EnterIcon} alt="enter" />
        </button>
      </div>
      {!!errorMessage && (
        <p className={styles.root__message}>{errorMessage}</p>
      )}
    </div>
  );
};

export default UserForm;
