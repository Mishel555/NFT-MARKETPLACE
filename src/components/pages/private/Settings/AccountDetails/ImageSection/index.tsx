import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import api from '@services/api';
import { useAuth, usePopup } from '@hooks';
import { IAvailableCropDimensions, IImageUploaderProps } from '@constants/types';
import { ImageWithFallback } from '@components/atoms';
import ImageController from '../ImageController';


import styles from './style.module.scss';

interface IDimensions {
  [key: string]: IAvailableCropDimensions;
}

const DIMENSIONS: IDimensions = {
  avatar: {
    maxWidth: 1200,
    maxHeight: 1200,
    minWidth: 160,
    minHeight: 160,
    maxSize: 5,
  },
  banner: {
    maxWidth: 2500,
    maxHeight: 1500,
    minWidth: 1024,
    minHeight: 835,
    maxSize: 10,
  },
};

const ImageSection = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const popup = usePopup();
  const [showAvatarEdit, setShowAvatarEdit] = useState<boolean>(false);

  const onHover = useCallback(() => setShowAvatarEdit(true), []);
  const onLeave = useCallback(() => setShowAvatarEdit(false), []);

  const editBanner = useCallback(async (image: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', image);

      const { data } = await api.users.editMyBanner(formData);
      if (user) {
        setUser({
          ...user,
          banner: data.banner,
        });
      }

      popup.close();
      toast.success('Banner is successfully updated...');
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      toast.error(`${error.response?.statusText}, please try again`);
    }
  }, [popup, setUser, user, navigate]);

  const editAvatar = useCallback(async (image: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', image);

      const { data } = await api.users.editMyAvatar(formData);
      if (user) {
        setUser({
          ...user,
          avatar: data.avatar,
        });
      }

      popup.close();
      toast.success('Avatar is successfully updated...');
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      toast.error(`${error.response?.statusText}, please try again`);
    }
  }, [popup, setUser, user, navigate]);

  const openUpload = useCallback((type: string) => {
    popup.setData({
      cb: type === 'avatar' ? editAvatar : editBanner,
      availableDimensions: DIMENSIONS[type],
    } as IImageUploaderProps);

    popup.open('image_upload');
  }, [editAvatar, editBanner, popup]);

  return (
    <div className={styles.root}>
      <div className={styles.root__banner}>
        <ImageWithFallback src={user?.banner || ''} fallback="defaultBanner" />
        <div className={styles.root__banner_controls}>
          <ImageController edit={() => openUpload('banner')} />
        </div>
      </div>
      <div className={styles.root__avatar}>
        <ImageWithFallback src={user?.avatar || ''} fallback="defaultAvatar" />
        <div onMouseOver={onHover} onMouseLeave={onLeave} className={styles.root__avatar_controls}>
          {showAvatarEdit && (
            <ImageController edit={() => openUpload('avatar')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
