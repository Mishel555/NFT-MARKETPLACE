import Search from '../Search';
import styles from './style.module.scss';

interface IProps {
  search: (data: string) => void;
}

const Toolbar = ({ search }: IProps) => (
  <div className={styles.root}>
    <Search afterChange={search} />
    <h2 className={styles.root__title}>Available</h2>
    <h2 className={styles.root__title}>Price</h2>
    <h2 className={styles.root__title}>Quantity</h2>
    <h2 className={styles.root__title}>Total</h2>
  </div>
);

export default Toolbar;
