import classNames from 'classnames';
import { IDeleteConfirmProps } from '@constants/types';
import { usePopup } from '@hooks';

import styles from './style.module.scss';

const DeleteConfirm = ({
  confirm,
  firstMessage,
  secondMessage,
}: IDeleteConfirmProps) => {
  const { close } = usePopup();

  const accept = () => {
    confirm();
    close();
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <h2 className={styles.root__wrapper_title}>
          Are you sure ?
        </h2>
        <p className={styles.root__wrapper_desc}>
          {firstMessage}
          <br />
          {!!secondMessage && (
            secondMessage
          )}
        </p>
        <div className={styles.root__wrapper_group}>
          <button onClick={accept} className={classNames(styles.root__wrapper_btn, styles.root__wrapper_confirm)}>
            Yes
          </button>
          <button onClick={close} className={classNames(styles.root__wrapper_btn, styles.root__wrapper_cancel)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
