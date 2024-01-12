import { Fragment, useState } from 'react';
import DeleteCollaborator from '../../DeleteCollaborator';

import TrashIcon from '@assets/icons/trash-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  index: number;
  username?: string;
  deleteCollaborator: (index: number) => void;
}

const Toolbar = ({ index, username, deleteCollaborator }: IProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const openDelete = () => setShowPopup(true);
  const closeDelete = () => setShowPopup(false);
  const confirm = () => deleteCollaborator(index);

  return (
    <Fragment>
      <div className={styles.root}>
        <h4 className={styles.root__title}>{index + 1}. Collaborator</h4>
        <div className={styles.root__wrapper}>
          <span>delete</span>
          <button type="button" onClick={openDelete} className={styles.root__button}>
            <img alt="trash-icon" src={TrashIcon} className={styles.root__icon} />
          </button>
        </div>
      </div>
      {showPopup && <DeleteCollaborator username={username} cancel={closeDelete} confirm={confirm} />}
    </Fragment>
  );
};

export default Toolbar;
