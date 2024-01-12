import { Oval } from 'react-loading-icons';
import styles from './style.module.scss';

interface IProps {
  cancel: () => void;
}

const Processing = ({ cancel }: IProps) => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>Processing...</h1>
    <div className={styles.root__loading}>
      <Oval height="3em" stroke="#000" />
    </div>
    <p className={styles.root__message}>
      We are creating a preview of the video. the process takes a few minutes.
      You can close the page if you want and as soon as the video is available it can be found in the library
    </p>
    <button onClick={cancel} className={styles.root__cancel}>
      Cancel processing
    </button>
  </div>
);

export default Processing;
