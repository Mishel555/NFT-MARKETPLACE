import moment from 'moment';
import classNames from 'classnames';
import { useNotification } from '@hooks';
import styles from './style.module.scss';

interface IProps {
  id: number;
  date: string;
  read: boolean;
  message: string;
}

const Notification = ({
  id,
  date,
  read,
  message,
}: IProps) => {
  const { readNotification } = useNotification();

  return (
    <div onClick={() => readNotification(id)} className={classNames(styles.root, !read && styles.root__active)}>
      <span className={styles.root__date}>
        {moment(date).format('DD-MMM-YYYY hh:mm A')}
      </span>
      <div className={styles.root__text} dangerouslySetInnerHTML={{ __html: message }} />
      {!read && (
        <span className={styles.root__status} />
      )}
    </div>
  );
};

export default Notification;
