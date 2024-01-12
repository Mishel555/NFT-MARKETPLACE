import styles from './style.module.scss';

interface IProps {
  count: number;
}

const Counter = ({ count }: IProps) => (
  <p className={styles.root}>{count}</p>
);

export default Counter;
