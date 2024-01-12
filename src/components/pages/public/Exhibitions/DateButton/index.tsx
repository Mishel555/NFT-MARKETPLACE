import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  label: string;
  date: Date;
  currentDate: Date;
  onClick: (date: Date) => void;
}

const DateButton = ({
  label,
  date,
  currentDate,
  onClick,
}: IProps) => (
  <button
    type="button"
    onClick={() => onClick(date)}
    className={classNames(styles.root, (currentDate.getTime() === date.getTime()) && styles.root_active)}
  >
    {label}
  </button>
);

export default DateButton;
