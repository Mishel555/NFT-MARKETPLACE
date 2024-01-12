import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IArtAction, IMarketArt, IProfileArtType, IUser } from '@constants/types';
import { AxiosError } from 'axios';
import { usePopup } from '@hooks';
import api from '@services/api';
import { MarketCard } from '@components/molecules';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

const Favorites = ({ user }: IProps) => {
  const navigate = useNavigate();
  const popupController = usePopup();

  const [arts, setArts] = useState<IMarketArt[]>([]);

  const loadFavorites = useCallback(async () => {
    try {
      const { data } = await api.users.getUserFavorites(user['_id']);
      const temp: IMarketArt[] = [];
      data.map((data: { art: IProfileArtType }) => {
        temp.push({
          _id: data.art['_id'],
          user: data.art.artist,
          likes: data.art.likes,
          price: data.art.price,
          art: {
            ...data.art,
          },
        });
      });

      setArts(temp);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  }, [navigate, user]);

  const playArt = useCallback(async (id: string) => {
    try {
      const { data } = await api.art.getSingle(id);
      const art = data as IProfileArtType;

      if (art.isImage) {
        popupController.setData(art.preview);
        popupController.open('image');
        return;
      }

      popupController.setData({
        id,
        src: art.preview,
      });
      popupController.open('art_preview');
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [navigate, popupController]);

  const actions: IArtAction[] = useMemo(() => ([
    {
      name: 'Play',
      fn: playArt,
    },
  ]), [playArt]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <div className={styles.root}>
      {arts.map((art, index) => (
        <MarketCard key={index} art={art} actions={actions} showStatus />
      ))}
    </div>
  );
};

export default Favorites;
