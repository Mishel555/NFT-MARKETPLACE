import { useMemo } from 'react';
import { IUser } from '@constants/types';
import { getProfilePublicRoute } from '@utils';
import { InternalLink } from '@components/atoms';
import styles from './style.module.scss';

interface IProps {
  user: IUser | string;
}

const ExhibitionUser = ({ user }: IProps) => {
  const { _id, name, isRegisteredUser, role } = useMemo(() => ({
    _id: typeof user === 'string' ? '' : user['_id'],
    name: typeof user === 'string' ? user : user.header ?? user.login,
    isRegisteredUser: typeof user !== 'string',
    role: typeof user === 'string' ? 'user' : user.role.name,
  }), [user]);

  return (
    <div className={styles.root}>
      <p className={styles.root__name}>{name}</p>
      <ul className={styles.root__wrapper}>
        {isRegisteredUser ? (
          <InternalLink to={getProfilePublicRoute(_id, role)} className={styles.root__wrapper_item}>
            Show profile
          </InternalLink>
        ) : (
          <p className={styles.root__wrapper_item}>
            Unregistered user
          </p>
        )}
      </ul>
    </div>
  );
};

export default ExhibitionUser;
