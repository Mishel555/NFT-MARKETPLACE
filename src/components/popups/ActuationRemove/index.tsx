import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

interface IPropTypes {
  close: () => void;
  remove: () => void;
}

const ActuationRemove = ({
  remove,
  close,
}: IPropTypes) => {
  const confirm = () => {
    remove();
    close();
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
          Are You sure that You want to permanently delete all actuations of this actuation type?
        </p>
        <div className={styles.popup__small_group}>
          <button type="button" className={styles.popup__small_btn} onClick={confirm}>
            Delete actuations
          </button>
          <button type="button" className={styles.popup__small_btn_ghost} onClick={close}>
            back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActuationRemove;
