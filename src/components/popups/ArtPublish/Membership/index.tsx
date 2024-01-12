import { MembershipType } from '@constants/types';
import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  type?: string;
  changeType: (type: MembershipType) => void;
}

interface IType {
  label: string;
  name: MembershipType;
}

const TYPES: IType[] = [
  {
    label: 'Standard',
    name: 'Standard Membership',
  },
  {
    label: 'Platinum',
    name: 'Platinum Membership',
  },
];

const Membership = ({
  type,
  changeType,
}: IProps) => (
  <div className={styles.root}>
    <h4 className={styles.root__title}>Membership</h4>
    <div className={styles.root__wrapper}>
      {TYPES.map(({
        name,
        label,
      }) => (
        <button
          key={name}
          type="button"
          onClick={() => changeType(name)}
          className={classNames(styles.root__btn, type === name && styles.root__active)}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

export default Membership;
