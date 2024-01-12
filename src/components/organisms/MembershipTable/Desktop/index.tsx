import { MembershipType } from '@constants/types';
import MemberCol from '../MemberCol';
import UtilityCol from '../UtilityCol';

import styles from './style.module.scss';

interface IProps {
  types: string[];
  data: {[key in MembershipType]: {
    available: 'yes' | 'no' | 'paid';
    feature?: string;
  }[]};
}

const Desktop = ({ types, data }: IProps) => (
  <div className={styles.root}>
    <UtilityCol memberships={types} />
    <MemberCol type="none" items={data.none} />
    <MemberCol type="Standard Membership" items={data['Standard Membership']} />
    <MemberCol type="Platinum Membership" items={data['Platinum Membership']} />
  </div>
);

export default Desktop;
