import { Oval } from 'react-loading-icons';
import styles from './style.module.scss';

const Loading = () => (
  <div className={styles.root}>
    <Oval height="3em" stroke="#000" />
  </div>
);

export default Loading;
