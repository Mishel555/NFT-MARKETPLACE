import { MembershipType } from '@constants/types';
import { MembershipBadge } from '@components/atoms';
import MemberItem from '../MemberItem';

import styles from './style.module.scss';

interface IProps {
  type: MembershipType;
  items: {
    available: 'yes' | 'no' | 'paid';
    feature?: string;
  }[];
}

const MemberCol = ({ type, items }: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__heading}>
      <MembershipBadge type={type} className={styles.root__paige} />
    </div>
    <ul className={styles.root__list}>
      {items.map(({
        available,
        feature,
      }, index) => (
        <MemberItem key={index} available={available} feature={feature} />
      ))}
    </ul>
  </div>
);

export default MemberCol;
