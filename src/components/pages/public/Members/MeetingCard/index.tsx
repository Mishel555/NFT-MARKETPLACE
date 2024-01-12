import styles from './style.module.scss';

const MeetingCard = () => (
  <div className={styles.root}>
    <div className={styles.root__content}>
      <div>
        <h1 className={styles.root__content_title}>become a share holder</h1>
        <p className={styles.root__content_description}>
          Book a meeting with us to explore being part of our digital art revolution on a higher scale. Our ecosystem
          is growing by the day and we plan to continually expand our network of prominent galleries, facilities, and
          artists around the globe to be an interconnected collective for immersive art experiences.
        </p>
      </div>
      <button disabled className={styles.root__content_btn}>Book a meeting</button>
    </div>
  </div>
);

export default MeetingCard;
