import { DescriptionCarousel } from '@components/organisms';
import Experience from '../Experience';
import Cards from '../Cards';

import styles from './style.module.scss';

const IntroSection = () => (
  <section className={styles.root}>
    <Experience />
    <Cards />
    <DescriptionCarousel />
  </section>
);

export default IntroSection;

