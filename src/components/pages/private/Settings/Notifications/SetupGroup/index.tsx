import { IMockNotificationItem } from '@constants/types';
import SetupItem from '../SetupItem';
import styles from './style.module.scss';

interface IProps {
  name: string;
  notifications: IMockNotificationItem[];
  data: { [key: string]: number[] };
  onChange: (key: string, checked: boolean, type: number) => void;
}

const SetupGroup = ({
  name,
  data,
  notifications,
  onChange,
}: IProps) => (
  <div className={styles.root}>
    <h2 className={styles.root__title}>{name}</h2>
    <ul className={styles.root__wrapper}>
      {notifications.map(({
        key,
        title,
        text,
      }) => (
        <SetupItem
          key={key}
          id={key}
          title={title}
          email={data[key]?.includes(0)}
          push={data[key]?.includes(1)}
          description={text}
          onChange={onChange}
        />
      ))}
    </ul>
  </div>
);

export default SetupGroup;
