import { useEffect } from 'react';
import IntroSection from './IntroSection';
import BenefitSection from './BenefitSection';
// import ListSection from './ListSection';
import PlansSection from './PlansSection';
import MeetingSection from './MeetingSection';

import styles from './style.module.scss';

const Members = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <IntroSection />
      <BenefitSection />
      {/* <ListSection /> */}
      <PlansSection />
      <MeetingSection />
    </div>
  );
};

export default Members;
