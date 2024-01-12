import { createContext } from 'react';
import { INotificationContext } from '@constants/types';

export const NotificationContext = createContext<INotificationContext>({
  newsCount: 0,
  notifications: null,
  readNotification: () => {},
  addNotification: () => {},
});
