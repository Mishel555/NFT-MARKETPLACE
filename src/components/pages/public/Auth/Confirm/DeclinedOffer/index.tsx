import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';

import styles from './style.module.scss';
import { useEffect } from 'react';

const DeclineOffer = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const redirectToSignIn = () => {
    navigate('/signIn');
  };

  const redirectToSignUp = () => {
    navigate('/signUp');
  };

  useEffect(() => {
    logOut();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          Notification!
        </h1>
      </div>
      <div className={styles.question}>
        <label>
          You declined Offer from Gallery. <br />
          You can start registration again.
        </label>
      </div>
      <div className={styles.wrap}>
        <button onClick={redirectToSignUp}>
          Create an account
        </button>
        <button onClick={redirectToSignIn}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default DeclineOffer;
