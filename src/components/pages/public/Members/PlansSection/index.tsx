import { MembershipTable } from '@components/organisms';
import styles from './style.module.scss';

const PlansSection = () => (
  <section className={styles.root}>
    <h1 className={styles.root__title}>Elevate your experience</h1>
    <p className={styles.root__subTitle}>
      Compare between our different passes to choose your perfect fit.
    </p>

    <MembershipTable className={styles.root__table} />
  </section>
);

export default PlansSection;
