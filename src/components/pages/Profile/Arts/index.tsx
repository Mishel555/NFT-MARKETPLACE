import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { URLSearchParamsInit, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';
import { Bars } from 'react-loading-icons';
import { AxiosError } from 'axios';
import api from '@services/api';
import { copyObject, getDynamicQuery } from '@utils';
import { useAuth, usePopup } from '@hooks';
import { IArtAction, IMarketArt, IProfileArtType, IUser } from '@constants/types';
import { MarketCard, ShowRoomFilters, ShowRoomSort } from '@components/molecules';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
  nftOfMembers?: boolean;
}

const OPTIONS: string[] = [
  'updatedAt',
  'price',
  '-price',
  '-updatedAt',
];

const ACTIONS_HIDDEN_FILTERS: string[] = ['Member\'s NFT', 'published'];

const Arts = ({ user, nftOfMembers }: IProps) => {
  const popup = usePopup();
  const navigate = useNavigate();
  const { setUser, user: loggedUser } = useAuth();

  const isGuest = loggedUser ? user['_id'] !== loggedUser['_id'] : true;

  const [search, setSearch] = useSearchParams();
  const filter = search.get('filter');
  const sort = search.get('sort');

  const { ref, inView } = useInView();

  const prevChangedPage = useRef<number>(1);
  const [arts, setArts] = useState<IMarketArt[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const setQuery = useCallback((name: string, options: string | null) => {
    const query = getDynamicQuery();

    const temp = {
      ...(query),
    };

    if (options && options.length && options !== 'null') {
      temp[name] = options;
    } else {
      if (temp.hasOwnProperty(name)) {
        delete temp[name];
      }
    }

    setSearch(temp as URLSearchParamsInit, {
      replace: true,
    });
  }, [setSearch]);

  const setFilter = useCallback((filter: string): void => {
    setQuery('filter', filter);
  }, [setQuery]);

  const setOption = useCallback((sort: string): void => {
    setQuery('sort', sort);
    setCurrentPage(1);
  }, [setQuery]);

  const playArt = useCallback(async (id: string) => {
    try {
      const { data } = await api.art.getSingle(id);
      const art = data as IProfileArtType;

      if (art.isImage) {
        popup.setData(art.preview);

        return popup.open('image');
      }

      popup.setData({
        id,
        src: art.preview,
      });
      popup.open('art_preview');
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [navigate, popup]);

  // const downloadArt = useCallback(async (id: string) => {
  //   try {
  //     if (!token) {
  //       return;
  //     }
  //
  //     downloadArtFile(id, token);
  //   } catch (e) {
  //     const error = e as AxiosError;
  //
  //     if (error.response?.status === 401) {
  //       popup.open('login');
  //     }
  //   }
  // }, [popup, token]);

  const sellArt = useCallback(async (art: IProfileArtType) => {
    try {
      const { data } = await api.art.getSingle(art['_id']);

      popup.setData({
        art: data,
      });

      popup.open('art_publish');
    } catch (e) {
      console.log(e);
    }
  }, [popup]);

  const resellArt = useCallback(async (art: IProfileArtType) => {
    try {
      const { data } = await api.art.getSingle(art['_id']);

      popup.setData({
        art: data,
        resell: true,
        cb: () => {
          if (!loggedUser) return;
          const temp = copyObject(loggedUser) as IUser;
          const foundedIndex = temp.copies.findIndex(copy => copy.art === art['_id']);

          if (foundedIndex > -1) {
            temp.copies[foundedIndex].onSale = true;
            setUser(temp);
          }
        },
      });

      popup.open('art_publish');
    } catch (e) {
      console.log(e);
    }
  }, [loggedUser, popup, setUser]);

  const editCallback = useCallback((art: IProfileArtType) => {
    const temp = arts ? [...arts] : [];

    const foundedIndex = temp.findIndex(item => item['_id'] === art['_id']);

    if (foundedIndex > -1) {
      temp[foundedIndex] = {
        _id: art['_id'],
        user: art.artist,
        price: art.price,
        likes: art.likes,
        art,
      };

      setArts([...temp]);
    }
  }, [arts]);

  const editArt = useCallback(async (id: string) => {
    navigate(`/editor?art=${id}`);
  }, [navigate]);

  const editDetails = useCallback(async (id: string) => {
    try {
      popup.setData({
        id,
        cb: editCallback,
      });

      popup.open('edit_details');
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [editCallback, navigate, popup]);

  const editPreview = useCallback(async (id: string) => {
    try {
      const { data } = await api.art.getSingle(id);
      const art = data as IProfileArtType;

      popup.setData({
        id,
        image: art.thumb,
        cb: (image: string) => {
          const temp = copyObject(arts) as IMarketArt[];
          const foundedIndex = temp.findIndex(art => art['_id'] === id);

          if (foundedIndex > -1) {
            temp[foundedIndex].art.image = image;

            setArts(temp);
          }
        },
      });
      popup.open('edit_preview');
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      toast.error(error.response?.data.message || error.message || e);
    }
  }, [arts, popup]);

  const loadArts = useCallback(async () => {
    try {
      const isPageChanged = prevChangedPage.current < currentPage;
      const filterName = (() => {
        if (filter === 'processed') {
          return 'processed,approval,approved,rejected,onGalleryApproval';
        }

        if (filter === 'sold out' || filter === 'sold') {
          return '';
        }

        return filter || (loggedUser?.role.name === 'gallery' ? 'sold out' : 'published');
      })();

      const temp: IMarketArt[] = [];
      let params;

      if (filter === 'sold out') {
        params = {
          owned: true,
          ...(sort && { sort }),
          perPage: 10,
          page: currentPage,
        };
      } else {
        params = {
          ...(filter !== 'published' && filter !== 'sold' && { artist: true }),
          ...(filter === 'sold' && { sold: true }),
          ...(filterName && { status: filterName }),
          ...(sort && { sort }),
          perPage: 10,
          page: currentPage,
        };
      }

      if (user) {
        let response;

        if (nftOfMembers || filter === 'Member\'s NFT') {
          response = await api.art.getAll({
            gallery: user['_id'],
            status: 'published',
            perPage: 10,
            page: currentPage,
          });
        } else {
          response = await api.users.getUserArt(user['_id'], params);
        }

        const {
          data: {
            arts,
            hasNextPage,
          },
        } = response;

        arts.map((art: IProfileArtType) => {
          temp.push({
            _id: art['_id'],
            user: art.artist,
            likes: art.likes,
            price: art.price,
            art,
          });
        });


        if (isPageChanged) {
          setArts(prevState => [...prevState, ...temp]);
        } else {
          setArts(temp);
        }

        setHasNextPage(hasNextPage);
      }
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  }, [user, loggedUser, nftOfMembers, filter, sort, currentPage, navigate]);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prevState => {
        prevChangedPage.current = prevState;
        return prevState + 1;
      });
    }
  }, [hasNextPage]);

  const removeArt = useCallback(async (id: string) => {
    try {
      await api.art.delete(id);
      const temp = arts.filter(({ _id }) => _id !== id);

      setArts([...temp]);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        popup.open('login');
      }
    }
  }, [popup, arts]);

  const openRemoval = useCallback((id: string) => {
    popup.setData({
      id,
      close: () => popup.close(),
      confirm: async () => {
        await removeArt(id);
        popup.close();
      },
    });

    popup.open('art_remove');
  }, [popup, removeArt]);

  const actions: IArtAction[] = useMemo(() => ([
    {
      name: 'Play',
      fn: playArt,
    },
    ...(!nftOfMembers ? ([
      {
        name: 'Publish',
        fn: sellArt,
        disallowedKeys: ['sold', 'published'],
      },
      {
        name: 'Edit',
        fn: editArt,
        disallowedKeys: ['sold', 'published'],
      },
      {
        name: 'Edit Details',
        fn: editDetails,
        disallowedKeys: ['sold', 'published'],
      },
      {
        name: 'Edit Preview',
        fn: editPreview,
        disallowedKeys: ['sold', 'published'],
      },
      {
        name: 'Sell',
        fn: resellArt,
        disallowedKeys: ['sold', 'published'],
      },
    ]) : []),
    ...(user?.role.name === 'admin' ? ([{
      name: 'Delete',
      fn: openRemoval,
    }]) : []),
  ]), [playArt, sellArt, editArt, editDetails, editPreview, resellArt, user, openRemoval, nftOfMembers]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  useEffect(() => {
    loadArts();
  }, [loadArts]);

  useEffect(() => {
    if (!nftOfMembers && !filter && filters.length) {
      setFilter(filters[0]);
    }

    setCurrentPage(1);
  }, [nftOfMembers, filter, filters, setFilter, user]);

  useEffect(() => {
    if (user.role.name === 'artist') {
      if (!loggedUser) {
        setFilters([
          'published',
          'owned',
          'sold',
        ]);

        return;
      }

      if (loggedUser.role.name === 'admin' || loggedUser['_id'] === user['_id']) {
        setFilters([
          'published',
          'sold out',
          'processed',
          'sold',
        ]);
        return;
      }

      if (loggedUser.role.name === 'gallery' && user.gallery['_id'] === loggedUser['_id']) {
        setFilters([
          'published',
          'sold out',
          'processed',
          'sold',
        ]);

        return;
      }

      setFilters([
        'published',
        'sold out',
        'sold',
      ]);
    } else if (user.role.name === 'admin') {
      if (loggedUser && loggedUser['_id'] === user['_id']) {
        setFilters([
          'published',
          'sold out',
          'processed',
          'sold',
        ]);

        return;
      }

      setFilters([
        'published',
        'sold out',
        'sold',
      ]);
    } else if (user.role.name === 'gallery') {
      setFilters([
        'Member\'s NFT',
        'published',
        'sold out',
        'sold',
      ]);
    } else {
      setFilters([
        'published',
        'sold out',
        'sold',
      ]);
    }
  }, [user, loggedUser]);

  return (
    <div className={styles.root}>
      <div className={styles.root__controls}>
        {!nftOfMembers && (
          <ShowRoomFilters filters={filters} currentFilter={filter || ''} changeFilter={setFilter} />
        )}
        <ShowRoomSort options={OPTIONS} currentOption={sort || ''} selectOption={setOption} />
      </div>
      <div className={styles.root__wrapper} key={(sort || '') + (filter || '')}>
        {arts?.map((art, index) => (
          <MarketCard
            key={index}
            art={art}
            actions={(() => {
              if (isGuest) {
                return undefined;
              }

              if (ACTIONS_HIDDEN_FILTERS.includes(filter || '')) {
                return undefined;
              }

              return actions.filter((action) => !action.disallowedKeys?.includes(filter || ''));
            })()}
            showStatus
          />
        ))}
      </div>
      {hasNextPage && (
        <div ref={ref} className={styles.root__loader}>
          <Bars fill="#000000" height={100} />
        </div>
      )}
    </div>
  );
};

export default Arts;
