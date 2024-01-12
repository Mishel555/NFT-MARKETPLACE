import { useMemo } from 'react';
import classNames from 'classnames';
import { IUser } from '@constants/types';
import { ImageWithFallback, UserBadgeCircle } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
  size?: 'sm' | 'md' | 'lg';
  withPaige?: boolean;
}

const ProfileAvatar = ({ user, size = 'lg', withPaige }: IProps) => {
  const role = useMemo(() => (user?.role?.name), [user]);

  return (
    <div className={classNames(styles.root, styles[`root__${size}`])}>
      <ImageWithFallback src={user.avatar} fallback="defaultAvatar" />
      {withPaige && (
        <div className={styles.root__paige}>
          <UserBadgeCircle role={role} />
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
