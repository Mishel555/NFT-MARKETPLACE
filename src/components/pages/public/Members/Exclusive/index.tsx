import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

const Exclusive = () => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>
      BECOME AN EXCLUSIVE
      <br />
      GALLERY IN SPACE MEMBER
    </h1>
    <p className={styles.root__description}>
      For galleries and curators to unlock global opportunities and embrace the 5th Dimension of Art.
    </p>
    <InternalLink to='/#' className={styles.root__action}>
      HOW DOES IT WORK?
    </InternalLink>
  </div>
);

export default Exclusive;
