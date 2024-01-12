import Types from '@components/pages/private/Admin/Treatments/Types';
import Emotions from '@components/pages/private/Admin/Treatments/Emotions';
import styles from './style.module.scss';

const Treatments = () => (
  <div className={styles.root}>
    <div className={styles.root__block}>
      <h2 className={styles.root__subtitle}>
        Treatments
      </h2>
      <div>
        <Types />
      </div>
      <div>
        <Emotions />
      </div>
    </div>
  </div>
);

export default Treatments;
