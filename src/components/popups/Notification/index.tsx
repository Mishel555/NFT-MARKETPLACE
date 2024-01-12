import { usePopup } from '@hooks';

import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

interface IPropTypes {
  message: string;
}

const SaveRoom = ({
  message,
}: IPropTypes) => {
  const popupController = usePopup();

  const close = () => {
    popupController.close();
  };

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
          {message}
        </p>
        <div className={styles.popup__small_controller}>
          <button type="button" className={styles.popup__small_btn} onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default SaveRoom;
