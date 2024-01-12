import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

const Experience = () => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>Collect Your Experience</h1>
    <p className={styles.root__description}>Explore the 5th Dimension of Art with multi-sensory digital masterpieces.</p>
    <InternalLink to='/' className={styles.root__action}>
      HOW DOES IT WORK?
    </InternalLink>
  </div>
);

export default Experience;
