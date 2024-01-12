import { Oval } from 'react-loading-icons';

import styles from './styles.module.scss';

const EditorLoad = () => (
  <div className={styles.root}>
    <div className={styles.loader_root}>
      <Oval height="3em" stroke="#fff" />
    </div>
  </div>
);

export default EditorLoad;
