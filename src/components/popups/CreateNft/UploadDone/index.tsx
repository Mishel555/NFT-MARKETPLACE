import UploadedIcon from '@assets/icons/uploaded-success-icon.svg';
import styles from './style.module.scss';

interface IProps {
  cancel: () => void;
}

const UploadDone = ({ cancel }: IProps) => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>File Uploaded</h1>
    <img src={UploadedIcon} alt="done" className={styles.root__img} />
    <p className={styles.root__description}>File has been uploaded successfully</p>
    <button onClick={cancel} className={styles.root__cancel}>
      Cancel and replace the file
    </button>
  </div>
);

export default UploadDone;
