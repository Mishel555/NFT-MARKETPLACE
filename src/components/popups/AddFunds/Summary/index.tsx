import styles from './style.module.scss';

interface IProps {
  value: string;
}

const Summary = ({ value }: IProps) => (
  <div className={styles.root}>
    <h2 className={styles.root__title}>Summary</h2>
    <div className={styles.root__wrapper}>
      <span className={styles.root__values}>{value}</span>
    </div>
  </div>
);

export default Summary;
