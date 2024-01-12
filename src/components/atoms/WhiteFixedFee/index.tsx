import { IFee } from '@constants/types';

import styles from './style.module.scss';

interface IProps {
  fee: IFee;
}

const WhiteFixedFee = ({ fee }: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__wrapper}>
      {fee.percents[0] > 0 ? 'Fixed fee' : 'Free fee'}: {fee.percents[0]}%
    </div>
  </div>
);

export default WhiteFixedFee;
