import classNames from 'classnames';
import { MembershipType } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  type: MembershipType;
  className?: string;
}

const MembershipBadge = ({ type, className }: IProps) => (
  <p className={classNames(styles.root, styles[`root__${type.toLowerCase().replaceAll(' ', '')}`], className)}>
    {type === 'none' ? 'Member' : type.toLowerCase().replace(' membership', '')}
  </p>
);

export default MembershipBadge;
