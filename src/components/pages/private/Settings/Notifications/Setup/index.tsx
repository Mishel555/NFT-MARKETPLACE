import { Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IUser, IUserNotification } from '@constants/types';
import { NOTIFICATIONS } from '@constants/notifications';
import { copyObject } from '@utils';
import api from '@services/api';
import SetupGroup from '../SetupGroup';
import styles from './style.module.scss';

interface INotificationState {
  [key: string]: number[];
}

const Setup = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<INotificationState | null>(null);

  const onChange = (key: string, checked: boolean, type: number) => {
    if (!notifications) {
      return;
    }

    const temp = copyObject(notifications);

    if (checked) {
      temp[key].push(type);
    } else {
      const index = temp[key].findIndex((tempType: number) => tempType === type);

      if (index > -1) {
        temp[key].splice(index, 1);
      }
    }

    setNotifications(temp);
  };

  const loadNotifications = useCallback(async () => {
    try {
      const { data } = await api.users.getMe();
      const { notifications } = (data as IUser).settings;
      const temp: INotificationState = {};

      Object.keys(notifications).forEach(key => {
        switch (notifications[key]) {
          case 'push': {
            temp[key] = [1];
            break;
          }
          case 'mail': {
            temp[key] = [0];
            break;
          }
          case 'both': {
            temp[key] = [0, 1];
            break;
          }
          case 'none': {
            temp[key] = [];
            break;
          }
          default: {
            temp[key] = [];
          }
        }
      });

      setNotifications(temp);
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [navigate]);

  const saveSettings = async () => {
    try {
      if (!notifications) {
        return;
      }

      const temp: IUserNotification = {};

      Object.keys(notifications).forEach(key => {
        const data = notifications[key];

        if (!data.length) {
          return temp[key] = 'none';
        }

        if (data.length > 1) {
          return temp[key] = 'both';
        }

        if (data.includes(0)) {
          return temp[key] = 'mail';
        }

        if (data.includes(1)) {
          return temp[key] = 'push';
        }
      });

      await api.users.editMe({
        settings: {
          notifications: temp,
        },
      });

      toast.success('Settings successfully saved...');
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <Fragment>
      <div>
        <h2 className={styles.root__title}>Account information</h2>
        {notifications && (
          <ul className={styles.root__wrapper}>
            <div className={styles.root__group}>
              <span className={styles.root__group_item}>Type</span>
              <div className={styles.root__group_wrapper}>
                <span className={styles.root__group_item}>E-mail</span>
                <span className={styles.root__group_item}>Web</span>
              </div>
            </div>
            {Object.keys(NOTIFICATIONS).map((key) => (
              <SetupGroup
                key={key}
                name={key}
                data={notifications}
                onChange={onChange}
                notifications={NOTIFICATIONS[key]}
              />
            ))}
          </ul>
        )}
      </div>
      <div className={styles.root}>
        <button onClick={saveSettings} className={styles.root__submit}>
          Update settings
        </button>
        <button className={styles.root__cancel}>
          Cancel
        </button>
      </div>
    </Fragment>
  );
};

export default Setup;
