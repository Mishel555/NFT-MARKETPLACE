import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@hooks';
import Desktop from './Desktop';
import Mobile from './Mobile';
import PATHS from './paths';

import styles from './style.module.scss';

const SettingsSidebar = () => {
  const { pathname } = useLocation();
  const currentPath = pathname.slice(-(pathname.length - pathname.lastIndexOf('/'))).replace('/', '');
  const { user } = useAuth();

  const role = useMemo(() => user?.role.name || 'user', [user]);

  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>
        Profile settings
      </h1>
      <div className={styles.root__block}>
        <Desktop paths={PATHS} currentPath={currentPath} role={role} />
        <Mobile paths={PATHS} currentPath={currentPath} role={role} />
      </div>
    </div>
  );
};

export default SettingsSidebar;
