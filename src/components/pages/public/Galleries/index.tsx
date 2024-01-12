import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IBanner, IBannersResponse, IRole, IUser } from '@constants/types';
import api from '@services/api';
import { ProfileWrapper, ExploreToolBar, MainBanners } from '@components/organisms';

import styles from './style.module.scss';
import moment from 'moment/moment';

const OPTIONS = [
  {
    label: 'Newest',
    value: '-createdAt',
  },
  {
    label: 'Oldest',
    value: 'createdAt',
  },
];

const Galleries = () => {
  const [searchParams] = useSearchParams();

  const [banners, setBanners] = useState<IBanner[]>([]);
  const [galleries, setGalleries] = useState<IUser[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const loadGalleries = useCallback(async () => {
    try {
      const params = {
        role: 'gallery',
        perPage: 12,
        approved: true,
        page: currentPage,
        ...Object.fromEntries(searchParams.entries()),
      };

      const temp: IUser[] = [];
      const {
        data: {
          users,
          hasNextPage,
        }
      } = await api.users.getAll(params);

      users.forEach((artist: { role: IRole }) => {
        const { role } = artist;

        temp.push({
          ...artist as unknown as IUser,
          role: role,
        });
      });

      if (currentPage > 1) {
        setGalleries(prevState => [...prevState, ...temp]);
      } else {
        setGalleries(temp);
      }

      setHasNextPage(hasNextPage);
    } catch (e) {
      console.log(e);
    }
  }, [searchParams, currentPage]);

  const loadMore = useCallback(() => {
    setCurrentPage(prevState => prevState + 1);
  }, []);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    loadGalleries();
  }, [loadGalleries]);

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
      <ExploreToolBar options={OPTIONS} />
      <ProfileWrapper users={galleries} hasNextPage={hasNextPage} loadMore={loadMore} />
    </div>
  );
};

export default Galleries;

