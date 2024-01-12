import { ChangeEvent, useEffect, useState } from 'react';
import { UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Oval } from 'react-loading-icons';
import classNames from 'classnames';
import { AxiosError } from 'axios';
import { IAuctionPublishFormValues, IFixedPublishFormValues, IUser, UserRoles } from '@constants/types';
import api from '@services/api';
import { useAuth, useDebounce } from '@hooks';
import { CloseIcon } from '@components/icons';

import animations from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  index: number;
  getValue: UseFormWatch<IFixedPublishFormValues | IAuctionPublishFormValues>;
  setValue: UseFormSetValue<IFixedPublishFormValues | IAuctionPublishFormValues>;
  unregister: UseFormUnregister<IFixedPublishFormValues | IAuctionPublishFormValues>;
  errorMessage?: string;
  role?: UserRoles | null;
}

interface IData {
  id: string;
  username: string;
}

const UsernameField = ({ index, role, setValue: setFormValue, getValue, errorMessage, unregister }: IProps) => {
  const { user: loggedUser } = useAuth();

  const collaborators = getValue('collaborators');
  const defaultUsername = collaborators[index]?.username;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IData[] | null>(null);

  const [searchValue, setSearchValue] = useState<string>(defaultUsername || '');
  const debouncedValue = useDebounce(searchValue, 300);

  const deleteUser = () => {
    setData(null);
    setSearchValue('');
    setFormValue(`collaborators.${index}.username`, '');
  };

  const onUserSelect = (id: string, username: string) => {
    setData(null);
    setFormValue(`collaborators.${index}.id`, id);
    setFormValue(`collaborators.${index}.username`, username);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchValue(e.target.value);
    unregister(`collaborators.${index}.username`);
  };

  useEffect(() => {
    setSearchValue(defaultUsername);
  }, [defaultUsername]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (!role || !debouncedValue || !loggedUser) return;

        const { data } = await api.users.getAll({
          role,
          pagination: false,
          search: debouncedValue,
        });

        if (data.users.length) {
          return setData(data.users.map((user: IUser) => ({
            id: user['_id'],
            username: user.header ?? user.login,
          })));
        }

        setData(null);
      } catch (e) {
        const error = e as AxiosError;
        toast.error(error.response?.data.message || error.message || e);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [role, debouncedValue, loggedUser]);

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>Username*</h4>
      <div className={styles.root__form}>
        <input
          value={searchValue}
          disabled={!role}
          onChange={onChange}
          className={classNames(styles.root__input, !!errorMessage && !defaultUsername && styles.root__input_error)}
        />
        {loading && (
          <Oval height="1em" stroke="#000" className={styles.root__loader} />
        )}
        {defaultUsername && (
          <button onClick={deleteUser} className={styles.root__remove}>
            <CloseIcon fill="#000" width={14} height={14} />
          </button>
        )}
        {!!errorMessage && !defaultUsername && <span className={styles.root__message}>{errorMessage}</span>}
      </div>
      {data && defaultUsername !== searchValue && (
        <ul className={classNames(styles.root__wrapper, animations.born_via_fade)}>
          {data.map(({ id, username }) => {
            const disabled = loggedUser && loggedUser['_id'] === id || collaborators.findIndex(coll => coll.id === id) > -1;

            return (
              <li
                key={id}
                onClick={() => !disabled ? onUserSelect(id, username) : ''}
                className={classNames(
                  styles.root__item,
                  disabled && styles.root__item_disabled,
                )}
              >
                {username}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UsernameField;
