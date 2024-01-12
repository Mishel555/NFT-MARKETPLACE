import { Fragment, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '@hooks';
import { MainLogo } from '@components/icons';
import { ExternalLink, InternalLink } from '@components/atoms';

import { navLinks } from '../paths';
import ProfileMenu from './ProfileMenu';
import Notification from '../Notification';
import Currency from '../Currency';

import styles from './style.module.scss';

interface IProps {
  redirectToSignIn: () => void;
  redirectToSingUp: () => void;
}

const Desktop = ({ redirectToSignIn, redirectToSingUp }: IProps) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const role = useMemo(() => user?.role.name ?? 'guest', [user]);

  return (
    <div className={styles.root}>
      <InternalLink to="/" className={styles.root__mainLink}>
        <MainLogo />
      </InternalLink>
      <ul className={styles.root__navLinks}>
        {navLinks[role ?? 'guest'].map(({
          to,
          label,
          external,
        }, index) => external ? (
          <ExternalLink key={index} to={to} noBlank className={styles.root__navLinks_item}>
            {label}
          </ExternalLink>
        ) : (
          <InternalLink
            key={index}
            to={to}
            className={classNames(styles.root__navLinks_item, to === pathname && styles.root__navLinks_active)}
          >
            {label}
          </InternalLink>
        ))}
      </ul>
      <div className={styles.root__wrapper}>
        <Currency />
        {user ? (
          <Fragment>
            <Notification />
            <ProfileMenu user={user} />
          </Fragment>
        ) : (
          <Fragment>
            <button className={styles.root__wrapper_btn} onClick={redirectToSignIn}>
              sign in
            </button>
            <button
              onClick={redirectToSingUp}
              className={classNames(styles.root__wrapper_btn, styles.root__wrapper_join)}
            >
              join us
            </button>
          </Fragment>
        )}
      </div>

    </div>
  );
};

export default Desktop;
