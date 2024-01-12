import { CloseIcon } from '@components/icons';
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
    <button className={styles.emotion_item_close_button} type="button" onClick={() => remove(id)}>
      <CloseIcon fill="#fff" width={14} height={14} />
    </button>
  </div>
);

export default EmotionItem;
