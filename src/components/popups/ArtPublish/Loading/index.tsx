import { Puff } from 'react-loading-icons';
import styles from './style.module.scss';

const Loading = () => (
  <div className={styles.root}>
    <span>Publishing please wait...</span>
    <Puff height="5em" stroke="#B0A3FF" />
  </div>
);

export default Loading;
