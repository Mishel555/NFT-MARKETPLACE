import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IUserStats } from '@constants/types';
import moment from 'moment';
import api from '@services/api';
import UserItem from '../UserItem';
import EmptyMessage from '../EmptyMessage';
import Loading from '../Loading';
import styles from './style.module.scss';
import { useAuth } from '@hooks';

interface IProps {
  groupBy: 'artist' | 'gallery';
  galleryId?: string;
  setCSVUrl: (url: string) => void;
}

const startDate = '01-01-2022';
const today = moment().format('MM-DD-YYYY');

const UserTable = ({
  groupBy,
  galleryId,
  setCSVUrl,
}: IProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<IUserStats[] | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      setIsLoaded(false);

      const params = {
        // user: user['_id'],
        from: startDate,
        to: today,
        groupBy,
        type: 'sell',
        ...(galleryId && { gallery: galleryId }),
      };

      const {
        data,
        request,
      } = await api.stats.getStats(params);
      setCSVUrl(request.responseURL);

      setIsLoaded(true);
      setData(data);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
      console.log(e);
    }
  }, [user, galleryId, groupBy, setCSVUrl, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        {!isLoaded ? <Loading /> :
          data?.length ? data.map((data, index) => (
            <UserItem key={index} data={data} />
          )) : <EmptyMessage />
        }
      </div>
    </div>
  );
};

export default UserTable;
