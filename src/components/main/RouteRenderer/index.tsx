import { ReactElement } from 'react';
import { UserRoles } from '@constants/types';
import PrivateRoute from '../../../routes/components/PrivateRoute';
import GuestRoute from '../../../routes/components/GuestRoute';

interface IProps {
  element: ReactElement;
  mode?: 'private' | 'guest';
  roles?: UserRoles[];
}

const RouteRenderer = ({
  element,
  mode,
  roles,
}: IProps) => {
  if (mode) {
    if (mode === 'private') {
      const props = {
        ...(roles && { roles }),
      };

      return (
        <PrivateRoute {...props}>
          {element}
        </PrivateRoute>
      );
    }

    if (mode === 'guest') {
      return (
        <GuestRoute>
          {element}
        </GuestRoute>
      );
    }
  }

  return element;
};

export default RouteRenderer;
