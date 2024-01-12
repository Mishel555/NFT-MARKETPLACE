import { Fragment, ReactElement, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks';
import PATHS from '@constants/paths';
import AccountChecker from '../AccountChecker';

interface IPropTypes {
  roles?: string[];
  children: ReactElement;
}

const PrivateRoute = ({
  roles,
  children,
}: IPropTypes) => {
  const auth = useAuth();
  const location = useLocation();

  const user = auth.user;
  const userRoles = user?.role.name;

  const url = new URLSearchParams();
  url.set('redirect', location.pathname + location.search);

  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (roles && userRoles) {
        const allowed = roles.find(role => role === userRoles);

        if (allowed) {
          setIsAllowed(true);
          setIsChecked(true);
        } else {
          setIsAllowed(false);
          setIsChecked(true);
        }
      } else {
        setIsAllowed(true);
        setIsChecked(true);
      }
    } else {
      setIsAllowed(false);
      setIsChecked(true);
    }
  }, [user, userRoles, roles]);

  return isChecked ? isAllowed ? (
    <AccountChecker>
      {children}
    </AccountChecker>
  ) : (
    <Navigate to={{ pathname: PATHS.HOME, search: url.toString() }} />
    // eslint-disable-next-line react/jsx-no-useless-fragment
  ) : <Fragment></Fragment>;
};

export default PrivateRoute;
