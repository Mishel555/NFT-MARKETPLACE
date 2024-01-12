import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks';

interface IPropTypes {
  children: ReactElement;
}

const GuestRoute = ({ children }: IPropTypes) => {
  const auth = useAuth();
  const user = auth.user;

  const location = useLocation();
  const url = new URLSearchParams();
  url.set('redirect', location.pathname + location.search);

  return user ? (
    <Navigate
      to={{
        pathname: `/${user?.role.name === 'admin' ? 'settings/' : `profile/${user['_id']}`}`,
        search: url.toString(),
      }}
    />
  ) : children;
};

export default GuestRoute;
