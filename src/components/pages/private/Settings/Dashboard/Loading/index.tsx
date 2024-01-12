import { Oval } from 'react-loading-icons';
import styles from './style.module.scss';

const Loading = () => (
  <div className={styles.root}>
    <Oval strokeWidth={36} stroke="#7A52F4" />
  </div>
);

export default Loading;
