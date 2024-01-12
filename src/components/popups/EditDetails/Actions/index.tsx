import classNames from 'classnames';

import styles from './style.module.scss';

interface IProps {
  close: () => void;
}

const Actions = ({ close }: IProps) => (
  <div className={styles.root}>
    <button type="button" onClick={close} className={classNames(styles.root__btn, styles.root__cancel)}>
      cancel
    </button>
    <button type="submit" className={classNames(styles.root__btn, styles.root__submit)}>
      save
    </button>
  </div>
);

export default Actions;
