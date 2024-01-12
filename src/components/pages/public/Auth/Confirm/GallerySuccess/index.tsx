import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import styles from './style.module.scss';

const GallerySuccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectToProfile = (): void => {
    if (!user) return;

    navigate(`/profile/${user['_id']}`);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          Congratulations!
        </h1>
      </div>
      <div className={styles.question}>
        <label>
          You have been successfully registered as Gallery.
          Start creating Your Arts and enjoy!
        </label>
      </div>
      <div className={styles.wrap}>
        <button onClick={redirectToProfile}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default GallerySuccess;
