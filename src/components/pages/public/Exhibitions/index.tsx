import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IBanner, IBannersResponse, IExhibition } from '@constants/types';
import api from '@services/api';
import { MainBanners } from '@components/organisms';
import Filters from './Filters';
import Toolbar from './Toolbar';
import Wrapper from './Wrapper';

interface IParams {
  perPage: number;
  page: number;
  filter?: string;
  role?: string;
  date?: string;
  from?: string; // date
  to?: string; // date
  byGallery?: boolean;
  future?: boolean;
  past?: boolean;
  creators?: string;
}

import styles from './style.module.scss';
import moment from 'moment/moment';

const Exhibitions = () => {
  const [searchParams] = useSearchParams();

  const [banners, setBanners] = useState<IBanner[]>([]);
  const [exhibitions, setExhibitions] = useState<IExhibition[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const loadExhibitions = useCallback(async () => {
    try {
      const params: IParams = {
        ...Object.fromEntries(searchParams.entries()),
        perPage: 10,
        page: currentPage,
      };

      if (params.creators === 'artist') {
        params.byGallery = false;
        delete params.creators;
      }

      if (params.creators === 'gallery') {
        params.byGallery = true;
        delete params.creators;
      }

      if (params.date) {
        params.from = params.date;
        params.to = params.date;
        delete params.date;
      }

      if (params.filter) {
        if (params.filter === 'new') {
          params.future = true;
        }

        if (params.filter === 'previous') {
          params.past = true;
        }

        delete params.filter;
      }

      const {
        data: {
          events,
          hasNextPage,
        },
      } = await api.events.getAll(params);

      if (currentPage > 1) {
        setExhibitions(prevState => [...prevState, ...events]);
      } else {
        setExhibitions(events);
      }

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
    loadExhibitions();
  }, [loadExhibitions]);

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
      <div className={styles.root__wrapper}>
        <Filters />
        <div className={styles.root__content}>
          <Toolbar />
          <Wrapper exhibitions={exhibitions} hasNextPage={hasNextPage} loadMore={loadMore} />
        </div>
      </div>
    </div>
  );
};

export default Exhibitions;

