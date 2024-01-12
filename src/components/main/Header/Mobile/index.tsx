import { Fragment, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '@hooks';
import { BurgerIcon, MainLogo } from '@components/icons';
import { ExternalLink, ImageWithFallback, InternalLink, UserBadge } from '@components/atoms';

import { navLinks, profileMenu } from '../paths';
import Notification from '../Notification';
import Currency from '../Currency';

import CloseIcon from '@assets/icons/close-icon-black.svg';

import styles from './style.module.scss';

interface IProps {
  redirectToHome: () => void;
  redirectToSignIn: () => void;
  redirectToSignUp: () => void;
}

const Mobile = ({ redirectToHome, redirectToSignUp, redirectToSignIn }: IProps) => {
  const navigate = useNavigate();

  const { user, logOut } = useAuth();
  const { pathname } = useLocation();

  const [showMobile, setShowMobile] = useState<boolean>(false);

  const openMobile = useCallback((): void => setShowMobile(true), []);
  const closeMobile = useCallback((): void => setShowMobile(false), []);

  const signOut = useCallback(() => {
    closeMobile();
    navigate('/signIn');
    logOut();
    window.location.href = '/signIn';
  }, [logOut, navigate, closeMobile]);

  return (
    <div className={styles.root}>
      <div className={styles.root__preview}>
        <button className={styles.root__main} onClick={redirectToHome}>
          <MainLogo />
        </button>
        <button className={styles.root__preview_burger} onClick={openMobile}>
          <BurgerIcon width={32} height={32} />
        </button>
      </div>
      {showMobile && (
        <div className={styles.root_wrapper}>
          <div className={styles.root__wrapper_block}>
            <div className={styles.root__wrapper_top}>
              <MainLogo />
              <button className={styles.root__wrapper_close} onClick={closeMobile}>
                <img src={CloseIcon} alt="" />
              </button>
            </div>
            <ul className={styles.root__list}>
              {navLinks[user?.role.name ?? 'guest']?.map(({
                to,
                label,
                external,
              }, index) => (
                <li key={index} onClick={closeMobile} className={styles.root__list_item}>
                  {external ? (
                    <ExternalLink to={to} noBlank className={styles.root__list_link}>
                      {label}
                    </ExternalLink>
                  ) : (
                    <InternalLink
                      to={to}
                      className={classNames(styles.root__list_link, pathname === to && styles.root__list_active)}
                    >
                      {label}
                    </InternalLink>
                  )}
                </li>
              ))}
            </ul>
            <div>
              {user ? (
                <div className={styles.root__user}>
                  <div className={styles.root__user_info}>
                    <div className={styles.root__user_avatar}>
                      <ImageWithFallback src={user.avatar} fallback="defaultAvatar" />
                    </div>
                    <div className={styles.root__user_wrap}>
                      <p className={styles.root__user_name}>
                        {user.name ? `${user.name?.first} ${user.name?.last}` : user.header ?? user.login}
                      </p>
                      <UserBadge role={user.role.name} />
                    </div>
                  </div>
                  <ul className={styles.root__user_list}>
                    {user.role.name && profileMenu(user['_id'])[user?.role.name]?.map(({
                      to,
                      label,
                    }, index) => (
                      <li key={index} onClick={closeMobile} className={styles.root__user_list_item}>
                        <InternalLink to={to}>
                          {label}
                        </InternalLink>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.root__container}>
                    <Notification closeMobile={closeMobile} />
                    <Currency />
                  </div>
                  <button onClick={signOut} className={styles.root__user_btn}>
                    log out
                  </button>
                </div>
              ) : (
                <Fragment>
                  <div className={styles.root__container}>
                    <Currency />
                  </div>
                  <div className={styles.root__group}>
                    <button onClick={redirectToSignIn} className={styles.root__group_btn}>
                      sign in
                    </button>
                    <button onClick={redirectToSignUp} className={styles.root__group_join}>
                      join us
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mobile;
