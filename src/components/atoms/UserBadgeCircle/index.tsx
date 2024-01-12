import { UserRoles } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  role: UserRoles;
}

const UserBadge = ({ role }: IProps) => (
  <div>
    <label className={styles[`root__${role}`]}>
      {role === 'user' ? 'c' : role[0]}
    </label>
  </div>
);

export default UserBadge;
