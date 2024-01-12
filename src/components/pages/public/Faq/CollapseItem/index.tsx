import { useState } from 'react';
import classNames from 'classnames';

import DownIcon from '@assets/icons/bottom-icon.svg';
import styles from './style.module.scss';

interface IPropTypes {
  question: string;
  answer: string;
}

const CollapseItem = ({
  question,
  answer,
}: IPropTypes) => {
  const [isHide, setIsHide] = useState<boolean>(true);

  return (
    <div className={styles.root}>
      <div
        className={classNames(styles.root__preview, !isHide && styles.root__preview_active)}
        onClick={() => setIsHide(!isHide)}
      >
        <p className={styles.root__preview_text}>
          {question}
        </p>
        <button className={classNames(styles.root__preview_button, !isHide && styles.root__preview_button_active)}>
          <img src={DownIcon} alt="" />
        </button>
      </div>
      {!isHide ? (
        <div className={styles.root__answer}>
          {answer}
        </div>
      ) : null}
    </div>
  );
};

export default CollapseItem;
