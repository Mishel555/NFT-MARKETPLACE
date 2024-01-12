import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '@hooks';

import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

const WithoutSaving = () => {
  const navigate = useNavigate();
  const { close } = usePopup();

  const confirm = useCallback(() => {
    close();
    navigate('/multisensory');
  }, [navigate, close]);

  return (
    <div className={styles.popup__dark}>
      <div className={styles.popup__small}>
        <button className={styles.popup__small_close} type="button" onClick={close}>
          <img src={CloseIcon} alt="" />
        </button>
        <h1 className={styles.popup__small_title}>
          NOTIFICATION
        </h1>
        <p className={styles.popup__small_text}>
          Your Art will not be saved.
          <br />
          Are You sure you want to leave?
        </p>
        <div className={styles.popup__small_controller}>
          <button type="button" className={styles.btnGhost} onClick={close}>
            Cancel
          </button>
          <button type="button" className={styles.btn} onClick={confirm}>
            Leave without saving
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithoutSaving;
