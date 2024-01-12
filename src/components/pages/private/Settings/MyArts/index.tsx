import { IUser } from '@constants/types';
import Arts from '@components/pages/Profile/Arts';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

const MyArts = ({ user }: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__block}>
      <h2 className={styles.root__subtitle}>
        My Arts
      </h2>
      <div>
        <Arts user={user} />
      </div>
    </div>
  </div>
);

export default MyArts;
