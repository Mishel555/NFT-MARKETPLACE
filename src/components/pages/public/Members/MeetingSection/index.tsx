import MeetingCard from '../MeetingCard';
import TalkCard from '../TalkCard';

import styles from './style.module.scss';

const MeetingSection = () => (
  <section className={styles.root}>
    <MeetingCard />
    <TalkCard />
  </section>
);

export default MeetingSection;
