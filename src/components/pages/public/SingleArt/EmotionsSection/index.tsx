import styles from './style.module.scss';
import { IEmotion } from '@constants/types';

interface IProps {
  emotions: IEmotion[];
}

const EmotionsSection = ({ emotions }: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__item}>
      <h3 className={styles.root__title}>
        TAGGED EMOTIONS
      </h3>
      <div className={styles.root__wrapper}>
        {emotions.map(({name}, index) => (
          <span key={index} className={styles.root__btn}>
            {name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default EmotionsSection;
