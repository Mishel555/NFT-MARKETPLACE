import styles from './styles.module.scss';
import classNames from 'classnames';
import { CloseIcon } from '@components/icons';

interface IProps {
  accept: () => void;
  close: () => void;
}

const Actions = ({
  close,
  accept,
}: IProps) => (
  <div className={styles.root}>
    <p className={styles.root__text}>Based on it you able to make bids</p>
    <p className={styles.root__text}>After the Auction completed all the found will be distributed or returned.</p>
    <div className={styles.root__wrapper}>
      <button onClick={accept} className={classNames(styles.root__button, styles.root__accept)}>
        Ok
      </button>
      <button onClick={close} className={classNames(styles.root__button, styles.root__cancel)}>
        Cancel
      </button>
    </div>
    <button onClick={close} className={styles.root__close}>
      <CloseIcon fill="#000" />
    </button>
  </div>
);

export default Actions;
