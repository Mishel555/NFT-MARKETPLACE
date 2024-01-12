import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import classNames from 'classnames';
import { IUser } from '@constants/types';
import { InternalLink } from '@components/atoms';
import { ProfileAvatar } from '@components/molecules';
import { profileMenu } from '../../paths';

import LogoutIcon from '@assets/icons/logout.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

const ProfileMenu = ({ user }: IProps) => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggle = (): void => setIsActive(!isActive);
  const close = (): void => setIsActive(false);

  const signOut = (): void => {
    navigate('/signIn');

    logOut();
  };

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        close();
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);

  return (
    <div className={styles.root}>
      <div ref={menuRef} className={styles.root__avatar} onClick={toggle}>
        <ProfileAvatar user={user} size="md" withPaige />
        {isActive && (
          <div className={classNames(styles.root__wrapper, isActive && animatedStyles.born_via_fade)}>
            <ul className={styles.root__wrapper_list__wrapper}>
              {user.role.name && profileMenu(user['_id'])[user?.role.name]?.map(({ to, label }, index) => (
                <li key={index} className={styles.root__wrapper_list__item}>
                  <InternalLink to={to}>
                    {label}
                  </InternalLink>
                </li>
              ))}
            </ul>
            <hr />
            <button className={styles.root__btn} onClick={signOut}>
              <img alt="logout" src={LogoutIcon} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;