import { TailSpin } from 'react-loading-icons';
import styles from './style.module.scss';

const Loading = () => (
  <div className={styles.root}>
    <TailSpin stroke="#7A52F4" />
    <p className={styles.root__text}>Please wait...</p>
  </div>
);

export default Loading;
