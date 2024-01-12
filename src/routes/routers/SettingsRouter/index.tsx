import { Fragment, useMemo } from 'react';
import { useAuth } from '@hooks';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { RouteRenderer } from '@components/main';
import { SettingsRoutes } from '@constants/routes';

import styles from './style.module.scss';

const SettingsRouter = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    const path = pathname.replace('/settings/', '');

    if (!user) {
      return '';
    }

    return SettingsRoutes(user).find(route => route.path === path)?.title;
  }, [pathname, user]);

  return !!user ? (
    <div className={styles.root}>
      <h1 className={styles.root__title}>
        {pageTitle ?? 'Profile settings'}
      </h1>
      <Routes>
        {SettingsRoutes(user).map(({
          path,
          element,
          mode,
          roles,
        }, index) => (
          <Route key={index} path={path} element={<RouteRenderer element={element} mode={mode} roles={roles} />} />
        ))}
        <Route path="*" element={<Navigate to="/not-found-404" replace />} />
      </Routes>
    </div>
  ) : <Fragment> </Fragment>;
};

export default SettingsRouter;
