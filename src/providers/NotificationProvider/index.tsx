import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { INotification } from '@constants/types';
import { NotificationContext } from '@contexts/NotificationContext';
import { copyObject } from '@utils';
import api from '@services/api';
import { useAuth } from '@hooks';

interface IPropTypes {
  children?: ReactNode;
}

const NotificationProvider = ({ children }: IPropTypes) => {
  const { user } = useAuth();

  const [newsCount, setNewsCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<INotification[] | null>(null);

  const readNotification = useCallback(async (index: number) => {
    try {
      const temp = copyObject(notifications) as INotification[] | null;
      if (!temp || !temp[index]) {
        return;
      }
      await api.users.readPush({ index });

      temp[index].read = true;
      setNotifications(temp);
    } catch (e) {
      console.log(e);
    }
  }, [notifications]);

  const addNotification = useCallback((data: INotification) => {
    setNewsCount(prevState => prevState + 1);
    setNotifications(prevState => Array.isArray(prevState) ? [data, ...prevState] : [data]);
  }, []);

  useEffect(() => {
    if (notifications?.length) {
      const news = notifications.filter(notification => !notification.read);

      setNewsCount(news.length);
    }
  }, [notifications]);

  useEffect(() => {
    if (!user) return;

    if (!notifications?.length && user.notifications.length) {
      setNotifications(user.notifications);
    }

    const interval = setInterval(async () => {
      try {
        const { data } = await api.users.getMe();

        if (notifications?.length !== data.notifications.length) {
          setNotifications(data.notifications);
        }
      } catch (e) {
        console.log(e);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [user, notifications]);

  const contextValue = useMemo(() => ({
    newsCount,
    notifications,
    addNotification,
    readNotification,
  }), [newsCount, notifications, addNotification, readNotification]);

  return (
    // Providing data to our app
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};


export default NotificationProvider;
