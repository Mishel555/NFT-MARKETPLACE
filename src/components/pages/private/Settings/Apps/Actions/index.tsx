import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  submit: () => void;
  cancel: () => void;
}

const Actions = ({
  submit,
  cancel,
}: IProps) => (
  <div className={styles.root}>
    <button
      onClick={submit}
      className={classNames(styles.root__btn, styles.root__btn_dark)}
    >
      Update Settings
    </button>
    <button
      disabled
      onClick={cancel}
      className={classNames(styles.root__btn, styles.root__btn_light)}
    >
      Cancel
    </button>
  </div>
);

export default Actions;
