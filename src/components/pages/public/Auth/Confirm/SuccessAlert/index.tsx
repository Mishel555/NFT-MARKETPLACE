import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import styles from './style.module.scss';

const SuccessAlert = () => {
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
          Notification
        </h1>
      </div>
      <div>
        <p className={styles.info}>
          You are already registered in the system.
        </p>
      </div>
      <div className={styles.wrap}>
        <button onClick={redirectToProfile}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessAlert;
