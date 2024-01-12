import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import PATHS from '@constants/paths';
import { useAuth } from '@hooks';
import api from '@services/api';

import styles from './style.module.scss';

const DeclineOffer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cancel = () => {
    navigate(`${PATHS.CONFIRM}?redirect=true&type=offer`);
  };

  const confirm = async () => {
    try {
      const request = user?.requests[user?.requests.length - 1];

      if (request) {
        await api.requests.reject(request._id);
        navigate(`${PATHS.CONFIRM}?redirect=true&type=declinedOffer`);
      }

    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          Notification!
        </h1>
      </div>
      <div className={styles.question}>
        <label>
          You are about to decline Offer from Gallery. <br />
          This action cannot be canceled.
        </label>
      </div>
      <div className={styles.wrap}>
        <button onClick={cancel}>
          Cancel
        </button>
        <button onClick={confirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeclineOffer;
