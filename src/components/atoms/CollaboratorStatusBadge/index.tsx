import classNames from 'classnames';
import { CollaboratorStatusType } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  status: CollaboratorStatusType;
  className?: string;
}

const CollaboratorStatusBadge = ({ status, className }: IProps) => (
  <div className={classNames(styles.root, className)}>
    <span className={classNames(styles.root__circle, styles[`root__${status}`])} />
    <span className={styles.root__text}>
      {status}
    </span>
  </div>
);

export default CollaboratorStatusBadge;
