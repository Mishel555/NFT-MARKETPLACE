import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CaretArrowIcon, MoreIcon } from '@components/icons';
import animations from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  readonly?: boolean;
  disableClose?: boolean;
  editDetails: () => void;
  hideDetails: () => void;
}

const ToolActions = ({ readonly, editDetails, disableClose, hideDetails }: IProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(prevState => !prevState);
  const close = () => setIsOpen(false);

  const edit = () => {
    editDetails();
    close();
  };

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Element)) {
        close();
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);

  return (
    <Fragment>
      {!readonly && (
        <div ref={rootRef} className={styles.root}>
          <button type="button" onClick={toggle} className={styles.root__action}>
            <MoreIcon />
          </button>
          {isOpen && (
            <ul className={classNames(styles.root__wrapper, animations.born_via_fade)}>
              <li className={styles.root__item} onClick={edit}>Edit fees %</li>
              <li className={styles.root__item}>Delete</li>
            </ul>
          )}
        </div>
      )}
      <button onClick={hideDetails} disabled={disableClose} className={styles.root__action}>
        <CaretArrowIcon direction="top" fill="#000" />
      </button>
    </Fragment>
  );
};

export default ToolActions;
