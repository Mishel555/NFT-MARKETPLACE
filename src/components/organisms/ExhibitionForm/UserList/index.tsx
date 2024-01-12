import { IUser } from '@constants/types';
import { ImageWithFallback } from '@components/atoms';
import UserForm from '../UserForm';

import styles from './style.module.scss';

interface IProps {
  users: IUser[];
  name: string;
  hiddenUsers?: string[];
  selectUser: (user: IUser) => void;
  addUnregisteredUser: (user: string) => void;
  close: () => void;
}

const UserList = ({
  users,
  name,
  hiddenUsers,
  selectUser,
  addUnregisteredUser,
  close,
}: IProps) => (
  <div className={styles.root}>
    <ul className={styles.root__wrapper}>
      <UserForm role={name} addUser={addUnregisteredUser} />
      {users.map((user) => !hiddenUsers?.includes(user['_id']) && !hiddenUsers?.includes(user['header']) && (
        <li key={user['_id']} onClick={() => selectUser(user)} className={styles.root__item}>
          <ImageWithFallback src={user.avatar} fallback="defaultAvatar" className={styles.root__item_image} />
          <span className={styles.root__item_name}>{user.header ?? user.login}</span>
        </li>
      ))}
    </ul>
    <button type="button" onClick={close} className={styles.root__close}>
      Close
    </button>
  </div>
);

export default UserList;
