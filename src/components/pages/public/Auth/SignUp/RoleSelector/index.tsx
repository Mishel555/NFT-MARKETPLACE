import { USER_ROLES } from '@constants/userRoles';
import Header from '../Header';
import Role from './Role';

interface IProps {
  selectedRole: string | null;
  selectRole: (role: string | null) => void;
  confirm: () => void;
}

import styles from './style.module.scss';

const RoleSelector = ({ selectedRole, selectRole, confirm }: IProps) => (
  <div className={styles.root}>
    <Header
      currentStep={2}
      stepLength={selectedRole === 'artist' ? 4 : 3}
      stepTitle="Choose Your role"
    />
    <div>
      {USER_ROLES.map(({
        name,
        title,
        description,
      }, index) => (
        <Role
          key={index}
          name={name}
          title={title}
          description={description}
          selectedRole={selectedRole}
          selectRole={selectRole}
        />
      ))}
    </div>
    <div className={styles.root__wrapper}>
      <button className={styles.root__confirm} disabled={!selectedRole} onClick={confirm}>
        Confirm
      </button>
    </div>
  </div>
);

export default RoleSelector;
