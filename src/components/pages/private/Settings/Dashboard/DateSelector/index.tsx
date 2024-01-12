import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  dateModes: string[];
  selectedDateMode: number;
  changeDateMode: (option: number) => void;
}

const DateSelector = ({
  dateModes,
  selectedDateMode,
  changeDateMode,
}: IProps) => (
  <ul className={styles.root}>
    {dateModes.map((option, index) => (
      <li
        key={option}
        onClick={() => changeDateMode(index)}
        className={classNames(
          styles.root__item,
          selectedDateMode === index && styles.root__item_active,
        )}
      >
        {option}
      </li>
    ))}
  </ul>
);

export default DateSelector;
