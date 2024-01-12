import FaqPage from '@components/pages/private/Admin/Faq';
import styles from './style.module.scss';

const Faq = () => (
  <div className={styles.root}>
    <div className={styles.root__block}>
      <h2 className={styles.root__subtitle}>
        Faq
      </h2>
      <div>
        <FaqPage />
      </div>
    </div>
  </div>
);

export default Faq;
