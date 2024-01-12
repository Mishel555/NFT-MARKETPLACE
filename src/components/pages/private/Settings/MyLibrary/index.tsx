import MultisensoryEditor from '@components/pages/private/MultisensoryEditor';

import styles from './style.module.scss';

const MyLibrary = () => (
  <div className={styles.root}>
    <div className={styles.root__block}>
      <MultisensoryEditor />
    </div>
  </div>
);

export default MyLibrary;
