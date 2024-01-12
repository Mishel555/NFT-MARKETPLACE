import { useEffect, useState } from 'react';
import moment from 'moment';
import { convertDateToInitialTime } from '@utils';
import { Calendar } from '@components/organisms';
import Group from '../Group';
import DateButton from '../DateButton';

import DateIcon from '@assets/icons/date-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  setOption: (name: string, value: string) => void;
}

const today = moment().toDate();
const tomorrow = moment().add(1, 'days').toDate();
const nextWeek = moment().add(1, 'week').startOf('weeks').toDate();
const nextMonth = moment().add(1, 'months').startOf('months').toDate();

const AVAILABLE_DATES = [
  {
    label: 'Today',
    date: convertDateToInitialTime(today),
  },
  {
    label: 'Tomorrow',
    date: convertDateToInitialTime(tomorrow),
  },
  {
    label: 'Next week',
    date: convertDateToInitialTime(nextWeek),
  },
  {
    label: 'Next month',
    date: convertDateToInitialTime(nextMonth),
  },
];

const DateTool = ({ setOption }: IProps) => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<Date>(convertDateToInitialTime(today));

  const onDateChange = (newDate: Date) => setCurrentDate(convertDateToInitialTime(newDate));
  const toggle = () => setIsShow(prevState => !prevState);

  useEffect(() => {
    setOption('date', moment(currentDate).format('MM-DD-YYYY'));
  }, [currentDate]);

  return (
    <Group name="date">
      <div className={styles.root}>
        <div className={styles.root__shorts}>
          {AVAILABLE_DATES.map(({
            label,
            date,
          }) => (
            <DateButton
              key={label + currentDate}
              label={label}
              date={date}
              currentDate={currentDate}
              onClick={onDateChange}
            />
          ))}
        </div>
        <div className={styles.root__calendar}>
          <button onClick={toggle} className={styles.root__calendar_btn}>
            <span>
              {moment(currentDate).format('DD/MM/YYYY')}
            </span>
            <img src={DateIcon} alt="date" />
          </button>
          {isShow && (
            <div className={styles.root__calendar_wrapper}>
              <Calendar date={currentDate} onChange={onDateChange} />
            </div>
          )}
        </div>
      </div>
    </Group>
  );
};

export default DateTool;
