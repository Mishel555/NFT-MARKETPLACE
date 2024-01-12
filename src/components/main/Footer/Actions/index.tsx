import { ChainButton } from '@components/atoms';
import styles from './style.module.scss';

const Actions = () => (
  <div className={styles.root}>
    <ChainButton blockchain="polygon" />
    <ChainButton blockchain="ethereum" />
  </div>
);

export default Actions;
