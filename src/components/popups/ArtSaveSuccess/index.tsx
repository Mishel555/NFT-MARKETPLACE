import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

interface IPropTypes {
  close: () => void;
  back: () => void;
}

const ActuationRemove = ({
  back,
  close,
}: IPropTypes) => (
  <div className={styles.popup__dark}>
    <div className={styles.popup__small}>
      <button className={styles.popup__small_close} type="button" onClick={close}>
        <img src={CloseIcon} alt="" />
      </button>
      <h1 className={styles.popup__small_title}>
        NOTIFICATION
      </h1>
      <p className={styles.popup__small_text}>
        Your Art has been saved succesfully!
      </p>
      <div className={styles.popup__small_group}>
        <button type="button" className={styles.popup__small_btn} onClick={back}>
          Back To Library
        </button>
        <button type="button" className={styles.popup__small_btn_ghost} onClick={close}>
          close
        </button>
      </div>
    </div>
  </div>
);

export default ActuationRemove;
