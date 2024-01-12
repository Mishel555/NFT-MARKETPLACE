import { useCallback } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '@hooks';
import { MainLogo } from '@components/icons';

import styles from './style.module.scss';

const HeroSection = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const paramRole = searchParams.get('role');

  const { logOut } = useAuth();

  const inLoginPage = (pathname === '/signIn');

  const redirectToPage = useCallback(() => {
    navigate(inLoginPage ? '/signUp' : '/signIn');
    logOut();
  }, [navigate, inLoginPage, logOut]);

  return (
    <section className={classNames(styles.root, styles[`root_${paramRole}`])}>
      <div className={styles.root_desktop}>
        <div className={styles.root_desktop_block}>
          <div className={styles.mainLogo}>
            <Link to="/">
              <MainLogo />
            </Link>
          </div>
          <h1 className={styles.info__title}>
            A highly-curated platform for creating, collecting unique NFTs
          </h1>
        </div>
        <div className={styles.info__group}>
          <span className={styles.info_link__account}>{inLoginPage ? 'Don\'t have an account?' : 'Already have an account?'}</span>
          <button onClick={redirectToPage} className={styles.info_link__auth}>
            {inLoginPage ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
