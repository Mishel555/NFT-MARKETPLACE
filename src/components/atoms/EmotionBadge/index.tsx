import styles from './style.module.scss';

interface IPropTypes {
  emotion: string;
}

const EmotionBadge = ({ emotion }: IPropTypes) => (
  <div className={styles.root}>
    {emotion}
  </div>
);

export default EmotionBadge;
