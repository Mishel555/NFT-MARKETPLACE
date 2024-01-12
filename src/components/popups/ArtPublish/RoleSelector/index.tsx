import classNames from 'classnames';
import { UserRoles } from '@constants/types';
import { CloseIcon } from '@components/icons';
import { UserBadge } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  currentRole?: UserRoles;
  onChange: (role: UserRoles) => void;
  onRemove: () => void;
}

const ROLES: UserRoles[] = [
  'admin',
  'artist',
  'gallery',
];

const RoleSelector = ({ currentRole, onChange, onRemove }: IProps) => (
  <div className={styles.root}>
    <h4 className={styles.root__title}>Roles*</h4>
    <div className={styles.root__wrapper}>
      {ROLES.map((role) => (
        <UserBadge
          key={role}
          role={role}
          suffix={currentRole === role && <CloseIcon width={16} height={16} />}
          onClick={() => currentRole === role ? onRemove() : onChange(role)}
          className={classNames(currentRole && currentRole !== role && styles.root__disabled)}
        />
      ))}
    </div>
    {!currentRole && (
      <h4 className={styles.root__message}>Please choose a user role as collaborator</h4>
    )}
  </div>
);

export default RoleSelector;
