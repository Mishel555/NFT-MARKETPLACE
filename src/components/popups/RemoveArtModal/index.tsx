import { useEffect, useState } from 'react';
import api from '@services/api';

import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

interface IPropTypes {
  close: () => void;
  confirm: () => void;
  id: string;
}

const RemoveArtModal = ({
  close,
  confirm,
  id,
}: IPropTypes) => {
  const [title, setTitle] = useState<string>('unknown');

  useEffect(() => {
    let mounted = true;
    api.art.getSingle(id).then(({ data }) => {
      if (!mounted) {
        return;
      }

      setTitle(data.title);
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className={styles.popup__dark}>
      <div className={styles.popup__small}>
        <button className={styles.popup__small_close} type="button" onClick={close}>
          <img src={CloseIcon} alt="" />
        </button>
        <h1 className={styles.popup__small_title}>
          NOTIFICATION
        </h1>
        <p className={styles.popup__small_text}>
          You are about to delete {title}.
          <br />
          This file cannot be recovered.
        </p>
        <div className={styles.popup__small_controller}>
          <button type="button" className={styles.popup__small_btn} onClick={confirm}>
            Delete
          </button>
          <button type="button" className={styles.popup__small_btn_ghost} onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveArtModal;
