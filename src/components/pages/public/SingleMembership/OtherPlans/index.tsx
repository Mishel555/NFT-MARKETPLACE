import { MembershipTable } from '@components/organisms';
import styles from './style.module.scss';

const OtherPlans = () => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>
      Other Plans of Membership
    </h1>
    <MembershipTable className={styles.root__table} />
  </div>
);

export default OtherPlans;
