import { ArtType } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  type: ArtType;
  confirm: () => void;
  cancel: () => void;
}

const ResolutionWarning = ({
  type,
  cancel,
  confirm,
}: IProps) => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>Notification</h1>
    <p className={styles.root__description}>
      The uploaded {type} has a non-standard resolution that might affect the final result.
      Here are the standard resolutions:
    </p>
    <div className={styles.root__meta}>
      <ul className={styles.root__meta_list}>
        <li>
          360 ° 13440x2160
        </li>
        <li>
          270 ° 10080x2160
        </li>
      </ul>
      <ul className={styles.root__meta_list}>
        <li>
          180 ° 6720x2160
        </li>
        <li>
          110 ° 4800x2160
        </li>
      </ul>
    </div>
    <p className={styles.root__description}>
      Are you sure you want to upload the {type}?
    </p>
    <div className={styles.root__controls}>
      <button
        onClick={confirm}
        className={styles.root__controls_btn}
      >
        Confirm
      </button>
      <button
        onClick={cancel}
        className={styles.root__controls_btn}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default ResolutionWarning;
