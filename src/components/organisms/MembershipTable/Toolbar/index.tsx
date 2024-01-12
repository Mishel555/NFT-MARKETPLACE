import classNames from 'classnames';
import { MembershipType } from '@constants/types';
import { MembershipBadge } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  types: MembershipType[];
  active: MembershipType;
  onChange: (tab: MembershipType) => void;
}

const Toolbar = ({ types, active, onChange }: IProps) => (
  <ul className={styles.root}>
    {types.map((type) => (
      <li
        key={type}
        onClick={() => onChange(type)}
        className={classNames(styles.root__item, active === type && styles.root__item__active)}
      >
        <MembershipBadge type={type} />
      </li>
    ))}
  </ul>
);

export default Toolbar;
