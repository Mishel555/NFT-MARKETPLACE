import classNames from 'classnames';

import styles from './style.module.scss';

interface IProps {
  type: string;
  isAdmin: boolean;
  disabled?: boolean;
  changeType: (type: string) => void;
}

interface IType {
  label: string;
  name: string;
}

const TYPES: IType[] = [
  { label: 'Fixed price', name: 'fixed' },
  { label: 'Auction', name: 'auction' },
];

const Types = ({ type, disabled, changeType }: IProps) => (
  <div className={styles.root}>
    {TYPES.map(({ name, label }) => (
      <button
        key={name}
        disabled={disabled}
        onClick={() => changeType(name)}
        className={classNames(styles.root__btn, type === name && styles.root__active)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default Types;
