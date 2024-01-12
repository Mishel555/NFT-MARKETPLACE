import styles from './style.module.scss';

interface IPropTypes {
  count: number;
}

const EmotionCounter = ({ count }: IPropTypes) => (
  <div className={styles.emotion_item}>
    <span className={styles.emotion_item_title}>
      +{count}
    </span>
  </div>
);

export default EmotionCounter;
