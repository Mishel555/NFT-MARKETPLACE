import { useCallback, useState } from 'react';
import { IUser } from '@constants/types';
import UserList from '../UserList';

import PlusIcon from '@assets/icons/plus-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  curators: IUser[];
  unregisteredCurators: string[];
  users: IUser[];
  saveCurators: (users: IUser[]) => void;
  saveUnregisteredCurators: (users: string[]) => void;
}

const MAX_COUNT = 5;

const CuratorsField = ({
  curators,
  unregisteredCurators,
  users,
  saveCurators,
  saveUnregisteredCurators,
}: IProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const open = () => setIsActive(true);
  const close = () => setIsActive(false);

  const addCurators = useCallback((user: IUser) => {
    const data = [...curators, user];

    close();
    saveCurators(data);
  }, [curators, saveCurators]);

  const addUnregisteredCurator = useCallback((user: string) => {
    close();
    saveUnregisteredCurators([...unregisteredCurators, user]);
  }, [saveUnregisteredCurators, unregisteredCurators]);

  const removeCurator = useCallback((user: string) => {
    const curatorIndex = curators.findIndex(({ _id }) => _id === user);
    const unregisteredCuratorIndex = unregisteredCurators.findIndex(name => name === user);

    if (curatorIndex > -1) {
      const temp = [...curators];
      temp.splice(curatorIndex, 1);

      saveCurators(temp);
    }

    if (unregisteredCuratorIndex > -1) {
      const temp = [...unregisteredCurators];
      temp.splice(unregisteredCuratorIndex, 1);

      saveUnregisteredCurators(temp);
    }
  }, [curators, unregisteredCurators, saveCurators, saveUnregisteredCurators]);

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>
        Curated by
      </h4>
      <ul className={styles.root__list}>
        {curators.map(({
          _id,
          header,
          login,
        }) => (
          <li key={_id} onClick={() => removeCurator(_id)} className={styles.root__list_item}>
            <p className={styles.root__list_text}>{header ?? login}</p>
          </li>
        ))}
        {unregisteredCurators.map((user) => (
          <li key={user} onClick={() => removeCurator(user)} className={styles.root__list_item}>
            <p className={styles.root__list_text}>{user}</p>
          </li>
        ))}
        {isActive ? (
          <UserList
            users={users}
            name="Curator"
            hiddenUsers={curators.map(curator => curator['_id'])}
            selectUser={addCurators}
            addUnregisteredUser={addUnregisteredCurator}
            close={close}
          />
        ) : (curators.length + unregisteredCurators.length) < MAX_COUNT && (
          <button type="button" onClick={open} className={styles.root__list_btn}>
            Add Curator
            <img src={PlusIcon} alt="" />
          </button>
        )}
      </ul>
    </div>
  );
};

export default CuratorsField;
