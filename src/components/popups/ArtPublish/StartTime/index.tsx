import { useMemo } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import styles from './style.module.scss';

const today = moment();

const StartTime = () => {
  const startDate = useMemo(() => ({
    DD: today.format('DD'),
    MM: today.format('MM'),
    YYYY: today.format('YYYY'),
    HH: today.format('HH'),
    mm: today.format('mm'),
  }), []);

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>start time</h4>
      <div className={styles.root__wrapper}>
        <input
          disabled
          value={startDate.DD}
          className={classNames(styles.root__input, styles.root__day)}
        />
        /
        <input
          disabled
          value={startDate.MM}
          className={classNames(styles.root__input, styles.root__month)}
        />
        /
        <input
          disabled
          value={startDate.YYYY}
          className={classNames(styles.root__input, styles.root__year)}
        />
        <input
          disabled
          value={startDate.HH}
          className={classNames(styles.root__input, styles.root__day)}
        />
        :
        <input
          disabled
          value={startDate.mm}
          className={classNames(styles.root__input, styles.root__day)}
        />
      </div>
    </div>
  );
};

export default StartTime;
