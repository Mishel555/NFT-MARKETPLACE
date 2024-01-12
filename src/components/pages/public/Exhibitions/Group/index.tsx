import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { CaretArrowIcon } from '@components/icons';

import styles from './style.module.scss';

interface IProps {
  name: string;
  children: ReactNode;
}

const Group = ({
  name,
  children,
}: IProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const toggle = () => setIsOpened(!isOpened);

  return (
    <div className={styles.root}>
      <div className={styles.root__preview}>
        <span onClick={toggle}>
          {name}
        </span>
        <button onClick={toggle} className={classNames(styles.root__toggle, isOpened && styles.root__toggle_active)}>
          <CaretArrowIcon fill="#504A48" />
        </button>
      </div>
      {isOpened && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};

export default Group;
