import styles from './style.module.scss';

const Heading = () => (
  <div className={styles.root}>
    <h2 className={styles.root__title}>Item</h2>
    <h2 className={styles.root__title}>Price</h2>
  </div>
);

export default Heading;
