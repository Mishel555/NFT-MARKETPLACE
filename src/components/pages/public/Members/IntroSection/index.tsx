import { DescriptionCarousel } from '@components/organisms';
import Exclusive from '../Exclusive';

import styles from './style.module.scss';

const IntroSection = () => (
  <section className={styles.root}>
    <Exclusive />
    <DescriptionCarousel />
  </section>
);

export default IntroSection;
