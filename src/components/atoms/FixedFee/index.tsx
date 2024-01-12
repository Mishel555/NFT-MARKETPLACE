import classNames from 'classnames';
import { IFee } from '@constants/types';
import styles from './style.module.scss';

interface IPropTypes {
  fee: IFee;
  isCentered?: boolean;
}

const FixedFee = ({
  fee,
  isCentered,
}: IPropTypes) => (
  <div className={classNames(styles.root, isCentered && styles.root_center)}>
    <div className={styles.root__title}>
      {fee.percents[0] > 0 ? 'Fixed fee' : 'Free fee'}
    </div>
    <label className={styles.root__fee}>
      {fee.percents[0]}%
    </label>
  </div>
);

export default FixedFee;
