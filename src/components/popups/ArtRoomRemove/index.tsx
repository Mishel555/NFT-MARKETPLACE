import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

interface IPropTypes {
  title: string;
  close: () => void;
  confirm: () => void;
}

const RemoveRoom = ({
  title,
  close,
  confirm,
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
        You are about to delete {title}.
      </p>
      <div className={styles.popup__small_controller}>
        <button type="button" className={styles.popup__small_btn} onClick={confirm}>
          Delete
        </button>
        <button type="button" className={styles.popup__small_btn_ghost} onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);
export default RemoveRoom;
