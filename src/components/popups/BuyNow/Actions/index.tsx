import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  close: () => void;
  confirm: () => void;
}

const Controls = ({
  close,
  confirm,
}: IProps) => (
  <div className={styles.root}>
    <button type="button" onClick={confirm} className={classNames(styles.root_btn, styles.root_confirm)}>
      Confirm
    </button>
    <button type="button" onClick={close} className={classNames(styles.root_btn, styles.root_cancel)}>
      Cancel
    </button>
  </div>
);

export default Controls;
