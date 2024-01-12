import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { MainLogo } from '@components/icons';
import MobileBurger from '../MobileBurger';

import styles from './style.module.scss';

const MobileSection = () => (
  <section className={classNames(styles.root, styles.root__mobile)}>
    <div className={styles.mainLogo}>
      <Link to="/">
        <MainLogo />
      </Link>
    </div>
    <MobileBurger />
  </section>
);

export default MobileSection;
