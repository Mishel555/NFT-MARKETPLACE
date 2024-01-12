import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth, useDeviceManage, usePopup } from '@hooks';
import api from '@services/api';
import SaveSuccess from '@components/popups/ArtSaveSuccess';

import style from './style.module.scss';

const EditorFooter = () => {
  const popup = usePopup();

  const [search] = useSearchParams();
  const artId = search.get('art');

  const deviceManager = useDeviceManage();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const popupController = usePopup();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const sendToApprove = useCallback(async () => {
    try {
      if (artId) {
        const data = deviceManager.saveDevices();

        await api.art.edit(artId, data);

        const { data: art } = await api.art.getSingle(artId);

        popup.setData({ art });
        popup.open('art_publish');
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [artId, deviceManager, navigate, popup]);

  const openPublish = useCallback(async () => {
    try {
      if (!artId) {
        return;
      }

      const { data } = await api.art.getSingle(artId);

      popupController.setData({
        art: data,
      });
      popupController.open('art_publish');
    } catch (e) {
      console.log(e);
    }
  }, [popupController, artId]);

  const openPreview = () => {
    popupController.open('editor_preview');
  };

  const save = useCallback(async () => {
    try {
      if (artId) {
        const data = deviceManager.saveDevices();
        await api.art.edit(artId, data);
        setShowSuccess(true);
      }
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  }, [artId, deviceManager, logOut, popupController]);

  const redirectToLib = useCallback(() => {
    navigate('/multisensory');
  }, [navigate]);

  useEffect(() => () => popupController.close()
    // DO NOT REMOVE NEXT LINE
    // eslint-disable-next-line
    , []);

  return (
    <footer className={style.footer}>
      {showSuccess ? (
        <SaveSuccess
          close={() => setShowSuccess(false)}
          back={redirectToLib}
        />
      ) : null}
      <button className={style.footer__preview_button} onClick={openPreview}>
        preview
      </button>
      <button className={style.footer__save_button} onClick={save}>
        save
      </button>
      {user?.role.name !== 'admin' && (
        <button className={style.footer__save_button} onClick={sendToApprove}>
          Send for approval
        </button>
      )}
      {user?.role.name === 'admin' && (
        <button className={style.footer__save_button} onClick={openPublish}>
          Publish
        </button>
      )}
    </footer>
  );
};

export default memo(EditorFooter);
