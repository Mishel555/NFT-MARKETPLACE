import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import PATHS from '@constants/paths';

interface IProps {
  children: ReactElement;
}

const AccountChecker = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const { role, portfolio, approvedAt, requests } = user;

  useEffect(() => {
    if (!user) return;

    // ===+===+===+=== ADMIN USER ===+===+===+===
    if (role.name === 'admin') return;

    // ===+===+===+=== BASIC USER ===+===+===+===
    if (role.name === 'user') {
      return;
    }

    // ===+===+===+=== GALLERY USER ===+===+===+===
    if (role.name === 'gallery') {
      if (!approvedAt) {
        return navigate(`${PATHS.CONFIRM}?redirect=true&type=waitAdmin`, { replace: true });
      }

      return;
    }

    // ===+===+===+=== ARTIST USER ===+===+===+===
    if (role.name === 'artist') {
      if (!portfolio) {
        return navigate('/signUp/gallery', { replace: true });
      }

      if (!approvedAt && requests) {
        const { approvedByAdminAt, approvedByGalleryAt } = requests[requests?.length - 1] || {};

        if (approvedByGalleryAt) {
          return navigate(`${PATHS.CONFIRM}?redirect=true&type=offer`, { replace: true });
        }

        if (approvedByAdminAt) {
          return navigate(`${PATHS.CONFIRM}?redirect=true&type=waitGallery`, { replace: true });
        }

        return navigate(`${PATHS.CONFIRM}?redirect=true&type=waitAdmin`, { replace: true });
      }

      return;
    }
  }, [navigate, role, user, portfolio, approvedAt, requests]);

  return children;
};

export default AccountChecker;
