import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  role: string;
  suffix?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const UserBadge = ({ role, suffix, onClick, className }: IProps) => (
  <span
    onClick={onClick}
    className={classNames(styles.root, styles[`root__${role}`], onClick && styles.root__button, className)}
  >
    {role === 'user' ? 'collector' : role}
    &nbsp;
    {suffix}
  </span>
);

export default UserBadge;
