import { memo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, useDeviceManage, usePopup } from '@hooks';
import api from '@services/api';
import { convertFront, objectEquals } from '@utils';
import { MainLogo } from '@components/icons';
import ProfileMenu from './ProfileMenu';

import styles from './style.module.scss';

const EditorHeader = () => {
  const [search] = useSearchParams();
  const artId = search.get('art');

  const navigate = useNavigate();

  const { user } = useAuth();
  const popupController = usePopup();

  const deviceManager = useDeviceManage();
  const devices = deviceManager.devices;

  const redirectToLib = useCallback(() => {
    navigate('/multisensory');
  }, [navigate]);

  const checkData = async () => {
    if (artId && devices) {
      const { data } = await api.art.getSingle(artId);
      const actuations = data.actuations;
      const currentActuations = convertFront(devices);

      if (!objectEquals('actuations' in currentActuations && currentActuations.actuations, actuations)) {
        popupController.open('without_save');
      } else {
        redirectToLib();
      }
    } else {
      redirectToLib();
    }
  };

  return (
    <header className={styles.root}>
      <div className={styles.root__group}>
        <MainLogo fill="white" />
        <span className={styles.root__group_text}>
          multisensory editor mode
        </span>
      </div>
      <div className={styles.root__group}>
        <button className={styles.root__group_btn} onClick={checkData}>
          back to library
        </button>
        {user && (
          <ProfileMenu user={user} />
        )}
      </div>
    </header>
  );
};

export default memo(EditorHeader);
