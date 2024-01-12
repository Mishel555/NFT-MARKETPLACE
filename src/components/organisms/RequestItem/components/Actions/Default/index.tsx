import classNames from 'classnames';
import { ActionStateType } from '../index';

import AcceptIcon from '@assets/icons/check-brown-icon.svg';
import DeclineIcon from '@assets/icons/remove-grey-icon.svg';
import styles from './style.module.scss';

interface IPropTypes {
  approve: () => void;
  selectAction: (action: ActionStateType) => void;
  isAdmin?: boolean;
}

const Default = ({
  isAdmin,
  approve,
  selectAction,
}: IPropTypes) => {
  const accept = () => {
    if (isAdmin) {
      approve();
    } else {
      selectAction('accept');
    }
  };

  return (
    <div className={styles.root}>
      <p className={styles.root__title}>
        Actions for Artist
      </p>
      <div className={styles.root__group}>
        <button
          className={styles.root__group__btn}
          onClick={accept}
        >
          <img src={AcceptIcon} alt="" />
          Accept
        </button>
        <button
          className={classNames(styles.root__group__btn, styles.root__group__btn_decline)}
          onClick={() => selectAction('reject')}
        >
          <img src={DeclineIcon} alt="" />
          Decline
        </button>
      </div>
    </div>
  );
};

export default Default;
