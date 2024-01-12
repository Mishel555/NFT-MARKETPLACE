import { useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ILinkedTabs, IUser } from '@constants/types';
import { ProfileRoutes } from '@constants/routes';
import { ProfileActions, ProfileTabs } from '@components/molecules';
import { RouteRenderer } from '@components/main';
import styles from './style.module.scss';

interface IProps {
  user: IUser;
  path: 'public' | 'private';
}

const ProfileRouter = ({ user, path }: IProps) => {
  const { pathname } = useLocation();
  const currentPath = pathname.slice(-(pathname.length - pathname.lastIndexOf('/'))).replace('/', '');
  const purePath = (currentPath === user['_id'] || currentPath === 'me' || currentPath === '') ? '' : currentPath;

  const routes = useMemo(() => (ProfileRoutes(user)), [user]);
  const TABS = useMemo(() => {
    const tabs: ILinkedTabs[] = [];

    routes[path][user?.role.name ?? 'user'].forEach(({ path, tabTitle, counter }) => {
      if (tabTitle) {
        tabs.push({
          to: path,
          label: tabTitle,
          ...(counter && { counter }),
        });
      }
    });

    return tabs;
  }, [routes, user, path]);

  return (
    <div className={styles.root}>
      <div className={styles.root__controls}>
        <div>
          <ProfileTabs tabs={TABS} current={purePath} />
        </div>
        {path !== 'public' && <ProfileActions />}
      </div>
      <Routes>
        {routes[path][user?.role.name ?? 'user'].map(({
          path,
          element,
          mode,
          roles,
        }, index) => (
          <Route key={index} path={path} element={<RouteRenderer element={element} mode={mode} roles={roles} />} />
        ))}
        {/* <Route path="*" element={<Navigate to="/not-found-404" replace />} /> */}
      </Routes>
    </div>
  );
};

export default ProfileRouter;
