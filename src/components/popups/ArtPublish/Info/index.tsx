import { IEmotion, ITypes } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  description: string;
  emotions: IEmotion[];
  type: ITypes;
}

const Info = ({
  type,
  emotions,
  description,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__wrapper}>
      <div className={styles.root__itemSection}>
        <h1 className={styles.root__title}>emotions</h1>
        <ul className={styles.root__itemWrapper}>
          {emotions?.map(({ name }) => (
            <li key={name} className={styles.root__item}>
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.root__itemSection}>
        <h1 className={styles.root__title}>type</h1>
        <ul className={styles.root__itemWrapper}>
          <li className={styles.root__item}>
            {type?.name}
          </li>
        </ul>
      </div>
    </div>
    <div>
      <h1 className={styles.root__title}></h1>
      <p className={styles.root__text}>{description}</p>
    </div>
  </div>
);

export default Info;
