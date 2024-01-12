import DatePicker from 'sassy-datepicker';
import './sassy.css';
import styles from './style.module.scss';

interface IProps {
  date: Date;
  onChange: (newDate: Date) => void;
}

const Calendar = ({
  date,
  onChange,
}: IProps) => (
  <div className={styles.root}>
    <DatePicker onChange={onChange} value={date} className={styles.root_calendar} />
  </div>
);

export default Calendar;
