import { useCallback, useEffect, useState } from 'react';
import { URLSearchParamsInit, useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import moment from 'moment';
import api from '@services/api';
import { IBanner, IBannersResponse, IMarketArt, IProfileArtType } from '@constants/types';
import { copyObject, getDynamicQuery, objectEquals } from '@utils';
import { useCurrency } from '@hooks';
import { MainBanners } from '@components/organisms';
import Filters from './Filters';
import ArtBox from './ArtBox';
import SortTool from './SortTool';

import FilterIcon from '@assets/icons/filter-black-icon.svg';
import styles from './style.module.scss';

interface IFilterOptions {
  [key: string]: {
    _id: string;
    name: string; login: string;
  }[];
}

interface IFilterParams {
  sort?: string;
  creator?: string;
  emotions?: string;
  typeofart?: string;
  mode?: string;
  auction?: boolean;
}

interface IPrice {
  min: number;
  max: number;
}

const Marketplace = () => {
  const { currency, isRemember, open: openCurrency } = useCurrency();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const isUsd = currency === 'USD';

  const [banners, setBanners] = useState<IBanner[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [options, setOptions] = useState<IFilterOptions | null>(null);
  const [filters, setFilters] = useState<IFilterParams | null>(null);
  const [arts, setArts] = useState<IMarketArt[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [minMax, setMinMax] = useState<IPrice | null>(null);
  const [resetState, setResetState] = useState<number>(0);

  const toggleFilters = (): void => setShowFilter(prevState => !prevState);
  const closeFilters = (): void => setShowFilter(false);

  const setOption = useCallback((name: string, options: string | null) => {
    const query = getDynamicQuery();

    let temp: { [key: string]: string } | null = {
      ...(query),
    };

    if (options && options.length && options !== 'null') {
      if (temp[name] !== options) {
        temp[name] = options;
      }
    } else {
      if (temp.hasOwnProperty(name)) {
        delete temp[name];
      }
    }

    setSearchParams(temp as URLSearchParamsInit, {
      replace: true,
    });

    setCurrentPage(1);

    if (!Object.keys(temp).length) {
      temp = null;
    }

    if (!objectEquals(temp, filters)) {
      setFilters(temp);
    }
  }, [filters]);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prevState => prevState + 1);
    }
  }, [hasNextPage]);

  const loadArts = useCallback(async () => {
    try {
      const params = copyObject(filters ?? {});

      if (params.mode) {
        delete params.mode;
      }

      const {
        data: {
          arts,
          hasNextPage,
          filters: {
            types,
            emotions,
            artists,
            min,
            max,
          },
        }
      } = await api.art.getAll({
        status: 'published',
        perPage: 9,
        page: currentPage,
        ...params,
      });
      let temp: IMarketArt[] = [];

      arts.map((art: IProfileArtType) => {
        temp.push({
          _id: art['_id'],
          user: art.artist,
          likes: art.likes,
          price: art.price,
          art,
        });
      });

      const convertedTypes = Object.keys(types).map(id => ({
        _id: id,
        ...types[id],
      }));

      const convertedEmotions = Object.keys(emotions).map(id => ({
        _id: id,
        ...emotions[id],
      }));

      const convertedArtists = Object.keys(artists).filter(id => artists[id].count).map(id => ({
        _id: id,
        ...artists[id],
      }));

      if (currentPage > 1) {
        setArts(prevState => [...prevState, ...temp]);
      } else {
        setLoaded(false);
        setArts(temp);
        setCurrentPage(1);
        setLoaded(true);
      }

      setHasNextPage(hasNextPage);
      setOptions({
        types: [...convertedTypes],
        emotions: [...convertedEmotions],
        creator: [...convertedArtists],
      });

      if (!minMax) {
        setMinMax({
          min,
          max,
        });
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [filters, currentPage, navigate]);

  const clearFilters = useCallback(() => {
    setOption('emotions', null);
    setOption('auction', null);
    setOption('type', null);
    setOption('artists', null);
    setOption('sort', null);
    setOption('priceFrom', null);
    setOption('priceTo', null);
    setOption('search', null);
    setFilters(null);
    setResetState(prevState => prevState + 1);
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
    loadBanners();
  }, [loadBanners]);

  useEffect(() => {
    loadArts();
  }, [loadArts]);

  useEffect(() => {
    if (!isRemember) {
      setTimeout(openCurrency, 500);
    }
  }, []);

  useEffect(() => {
    const params = getDynamicQuery() as IFilterParams;

    if (!params) {
      return;
    }

    window.scrollTo(0, 0);
    setFilters(params);
  }, []);

  return (
    <div className={styles.root}>
      {!!banners.length && (
        <MainBanners banners={banners} />
      )}
      <div className={styles.root_block}>
        <button className={styles.root_filters__btn} onClick={toggleFilters}>
          <span>Filter</span>
          <img src={FilterIcon} alt="Filter icon" />
        </button>
        <div className={styles.root_sort__mobile}>
          <SortTool setOption={setOption} />
        </div>
        <div className={styles.root__wrapper}>
          {options && minMax && (
            <Filters
              key={resetState}
              options={options}
              minMax={minMax}
              show={showFilter}
              setOption={setOption}
              close={closeFilters}
              clearFilters={clearFilters}
            />
          )}
          <ArtBox
            arts={arts}
            loaded={loaded}
            hasMore={hasNextPage}
            setOption={setOption}
            loadMore={loadMore}
            isUsd={isUsd}
          />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
