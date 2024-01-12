import { useNotification } from '@hooks';
import { NotificationGroup } from '@components/molecules';
import styles from './style.module.scss';

const Messages = () => {
  const { notifications } = useNotification();

  return (
    <div className={styles.root}>
      {notifications && (
        <NotificationGroup label="" notifications={notifications} />
      )}
    </div>
  );
};

export default Messages;
