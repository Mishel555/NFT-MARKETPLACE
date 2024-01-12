import { memo } from 'react';
import RightsSection from './RightsSection';
import ContactSection from './ContactSection';
// import Actions from './Actions';

import styles from './style.module.scss';

const MarketFooter = () => (
  <footer className={styles.root}>
    <div className={styles.root__wrapper}>
      <RightsSection />
      <ContactSection />
    </div>
    {/* <Actions /> */}
  </footer>
);

export default memo(MarketFooter);
