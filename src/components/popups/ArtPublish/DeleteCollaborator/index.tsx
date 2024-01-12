import classNames from 'classnames';
import { CloseIcon } from '@components/icons';
import styles from './style.module.scss';

interface IProps {
  username?: string;
  confirm: () => void;
  cancel: () => void;
}

const DeleteCollaborator = ({ username, confirm, cancel }: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__content}>
      <button onClick={cancel} className={styles.root__close}>
        <CloseIcon width={18} height={18} fill="#000" />
      </button>
      <h1 className={styles.root__title}>Delete collaboration?</h1>
      <p className={styles.root__label}>
        Are you sure you want to delete {username || 'Collaboration'},
        all entered information will disappear
      </p>
      <div className={styles.root__wrapper}>
        <button
          onClick={confirm}
          className={styles.root__button}
        >
          Delete collaboration
        </button>
        <button
          onClick={cancel}
          className={classNames(styles.root__button, styles.root__button_cancel)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeleteCollaborator;
