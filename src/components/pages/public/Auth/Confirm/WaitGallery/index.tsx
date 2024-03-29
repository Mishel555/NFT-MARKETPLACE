import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PATHS from '@constants/paths';
import { useAuth } from '@hooks';
import styles from './style.module.scss';

const WaitGallery = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const redirectToSignIn = (): void => {
    logOut();
    navigate('/signIn');
  };

  useEffect(() => {
    if (user) {
      const { requests } = user;
      const request = requests[requests.length - 1] ?? null;

      if (!request) return;

      if (request.approvedByGalleryAt) {
        return navigate(`${PATHS.CONFIRM}?redirect=true&type=offer`, { replace: true });
      }

      if (request.rejectedByAdminAt && request.rejectedByGalleryAt) {
        return navigate('/signIn', { replace: true });
      }
    }
  }, [user]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          Done!
        </h1>
      </div>
      <div className={styles.question}>
        <label>
          Your application for registration of the Artist
          has been successfully created and sent to the Gallery.
          <br />
          <b>
            You will soon receive feedback on the results.
          </b>
        </label>
      </div>
      <div className={styles.wrap}>
        <button onClick={redirectToSignIn}>
          Back to login
        </button>
      </div>
    </div>
  );
};

export default WaitGallery;
