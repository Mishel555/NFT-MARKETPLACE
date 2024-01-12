import styles from './style.module.scss';

interface IProps {
  progress: number;
  cancel: () => void;
}

const UploadProgress = ({
  progress,
  cancel,
}: IProps) => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>
      uploading {progress} %...
    </h1>
    <div className={styles.root__progress}>
      <div style={{ width: `${progress}%` }} className={styles.root__progress_bar} />
    </div>
    <button onClick={cancel} className={styles.root__cancel}>
      Cancel
    </button>
  </div>
);

export default UploadProgress;
