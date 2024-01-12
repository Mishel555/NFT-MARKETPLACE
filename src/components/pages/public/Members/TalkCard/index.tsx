import styles from './style.module.scss';

const TalkCard = () => (
  <div className={styles.root}>
    <p className={styles.root__text}>let's talk</p>
    <h1 className={styles.root__title}>Got questions?</h1>
    <button className={styles.root__button}>Book a meeting</button>
  </div>
);

export default TalkCard;
