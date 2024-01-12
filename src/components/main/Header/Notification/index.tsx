import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useNotification } from '@hooks';
import classNames from 'classnames';

import { CloseIcon } from '@components/icons';
import { NotificationGroup } from '@components/molecules';

import NotificationIcon from '@assets/icons/notification-black-icon.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  closeMobile?: () => void;
}

const Notification = ({ closeMobile }: IProps) => {
  const navigate = useNavigate();
  const { newsCount, notifications } = useNotification();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const toggle = () => {
    if (!isMobile) {
      return setShow(prevState => !prevState);
    }

    if (closeMobile) {
      closeMobile();
    }

    navigate('/settings/notifications?show=true');
  };
  const close = () => setShow(false);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      close();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button onClick={toggle} className={styles.root__btn}>
        <img src={NotificationIcon} alt="icon" className={styles.root__icon} />
        {!!newsCount && (
          <label className={styles.root__counter}>
            {newsCount}
          </label>
        )}
      </button>
      {show && notifications && (
        <div className={classNames(styles.root__content, show && animatedStyles.born_via_fade)}>
          <div className={styles.root__heading}>
            <h1 className={styles.root__heading_title}>Notifications</h1>
            <button className={styles.root__close} onClick={close}>
              <CloseIcon fill="#000" width={24} height={24} />
            </button>
          </div>
          <div className={styles.root__wrapper}>
            {notifications && (
              <NotificationGroup label="" notifications={notifications} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
