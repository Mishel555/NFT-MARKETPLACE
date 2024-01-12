import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IBanner, IBannersResponse, IRole, IUser } from '@constants/types';
import api from '@services/api';
import { MainBanners, ProfileWrapper } from '@components/organisms';
import Toolbar from './Toolbar';

import styles from './style.module.scss';
import moment from 'moment/moment';

const SORT_PARAMS = [
  {
    label: 'Newest',
    value: '-createdAt',
  },
  {
    label: 'Oldest',
    value: 'createdAt',
  },
];

const Artists = () => {
  const [searchParams] = useSearchParams();

  const [banners, setBanners] = useState<IBanner[]>([]);
  const [artists, setArtists] = useState<IUser[]>([]);
  const [galleries, setGalleries] = useState<IUser[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const loadUsers = useCallback(async () => {
    try {
      const params = {
        role: 'artist',
        ...Object.fromEntries(searchParams.entries()),
        perPage: 12,
        page: currentPage,
        approved: true,
      };

      const tempArtists: IUser[] = [];
      const tempGalleries: IUser[] = [];

      const {
        data: {
          users: artists,
          hasNextPage,
        },
      } = await api.users.getAll(params);

      const { data: { users: galleries } } = await api.users.getAll({
        role: 'gallery',
        pagination: false,
      });

      artists.forEach((artist: { role: IRole }) => {
        const { role } = artist;

        tempArtists.push({
          ...artist as unknown as IUser,
          role: role,
        });
      });

      galleries.forEach((gallery: { role: IRole }) => {
        const { role } = gallery;

        tempGalleries.push({
          ...gallery as unknown as IUser,
          role: role,
        });
      });

      if (currentPage > 1) {
        setArtists(prevState => [...prevState, ...tempArtists]);
      } else {
        setArtists(tempArtists);
      }

      setGalleries(tempGalleries);
      setHasNextPage(hasNextPage);
    } catch (e) {
      console.log(e);
    }
  }, [searchParams, currentPage]);

  const loadBanners = useCallback(async () => {
    try {
      const { data } = await api.banners.getAll();
      const temp = data as IBannersResponse[];

      setBanners(temp.map((banner) => ({
        _id: banner['_id'],
        __v: banner['__v'],
        image: banner.image,
        ...(banner.link && ({ url: (banner.link) })),
        ...(banner.buttonName && ({ buttonName: banner.buttonName })),
        ...(banner.title && ({
          title: {
            label: banner.title,
            color: banner.titleColor,
          },
        })),
        ...(banner.descr && ({
          description: {
            label: banner.descr,
            color: banner.descrColor,
          },
        })),
        ...(banner.endsAt && ({
          countdown: {
            color: banner.countdownColor,
            endsAt: moment(banner.endsAt).toISOString(),
          },
        })),
      })));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const loadMore = useCallback(() => {
    setCurrentPage(prevState => prevState + 1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      {!!banners.length && (
        <MainBanners banners={banners} />
      )}
      <Toolbar sortOptions={SORT_PARAMS} galleries={galleries} />
      <ProfileWrapper users={artists} hasNextPage={hasNextPage} loadMore={loadMore} />
    </div>
  );
};

export default Artists;

