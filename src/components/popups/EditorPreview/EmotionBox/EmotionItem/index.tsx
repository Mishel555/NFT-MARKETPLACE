import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

interface IPropTypes {
  id: string;
  name: string;
  remove: (id: string) => void;
}

const EmotionItem = ({
  id,
  name,
  remove,
}: IPropTypes) => (
  <div className={styles.emotion_item}>
    <span className={styles.emotion_item_title}>
      {name}
    </span>
    <button type="button" className={styles.emotion_item_close_button} onClick={() => remove(id)}>
      <img alt="icon" src={CloseIcon} />
    </button>
  </div>
);

export default EmotionItem;
