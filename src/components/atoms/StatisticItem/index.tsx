import styles from './style.module.scss';

interface IProps {
  name: string;
  value: number;
}

const StatisticItem = ({
  name,
  value,
}: IProps) => (
  <div className={styles.root}>
    <p className={styles.root__number}>
      {value}
    </p>
    <p className={styles.root__text}>
      {name}
    </p>
  </div>
);

export default StatisticItem;
