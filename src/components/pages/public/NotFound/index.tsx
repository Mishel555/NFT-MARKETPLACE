import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NotFoundImg from '@assets/icons/not-found-img.svg';
import styles from './style.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <img src={NotFoundImg} className={styles.root_img} alt="notFound" />
      <p className={styles.root_text}>
        The requested page does not exist.
      </p>
      <p className={styles.root_text}>
        You can back to previous page and try again
      </p>
      <button onClick={goBack} className={styles.root_btn}>
        Back
      </button>
    </div>
  );
};

export default NotFound;
