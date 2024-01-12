import { INotification } from '@constants/types';
import { Notification } from '@components/molecules';
import styles from './style.module.scss';

interface IProps {
  label: string;
  notifications: INotification[];
}

const NotificationGroup = ({
  label,
  notifications,
}: IProps) => (
  <div className={styles.root}>
    <p className={styles.root__title}>{label}</p>
    {notifications.map(({
      read,
      date,
      message,
    }, index) => (
      <Notification
        key={index}
        id={index}
        date={date}
        read={read}
        message={message}
      />
    ))}
  </div>
);

export default NotificationGroup;
