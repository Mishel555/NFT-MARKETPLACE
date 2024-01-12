import { Fragment } from 'react';
import classNames from 'classnames';
import { ArtType, UserRoles } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  role: UserRoles;
  type: ArtType;
  step: number;
  artId: string | null;
  next: () => void;
  prev: () => void;
  close: () => void;
  create: () => void;
  done: () => void;
  save: () => void;
}

const Controls = ({
  type,
  step,
  artId,
  next,
  prev,
  close,
  create,
  save,
  done,
}: IProps) => (
  <div className={styles.root}>
    {(() => {
      switch (step) {
        case 0:
          return (
            <Fragment>
              <button
                onClick={close}
                className={classNames(styles.root__btn, styles.root__backBtn)}
              >
                Close
              </button>
              <button onClick={next} className={styles.root__btn}>Next</button>
            </Fragment>
          );
        case 1:
          return (
            <Fragment>
              <button onClick={prev} className={classNames(styles.root__btn, styles.root__backBtn)}>
                Back
              </button>
              <button
                onClick={next}
                disabled={!artId}
                className={styles.root__btn}
              >
                {!artId ? 'Wait...' : 'Next'}
              </button>
            </Fragment>
          );
        case 2:
          return (
            <button
              onClick={create}
              className={styles.root__btn}
            >
              Create
            </button>
          );
        case 3:
          return (
            <button onClick={next} className={classNames(styles.root__btn, styles.root__backBtn)}>
              Next
            </button>
          );
        case 4:
          return (
            <Fragment>
              <button onClick={save} className={classNames(styles.root__btn, styles.root__backBtn)}>
                Save
              </button>
              <button onClick={done} className={styles.root__btn}>
                {type === 'video' ? 'Start editing' : 'Next'}
              </button>
            </Fragment>
          );
      }
    })()}
  </div>
);

export default Controls;
