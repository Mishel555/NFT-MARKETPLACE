import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { Bars } from 'react-loading-icons';
import { AxiosError } from 'axios';
import { ArtStatusType, IArtAction, IMarketArt, IProfileArtType, IUser } from '@constants/types';
import { useAuth, usePopup } from '@hooks';
import api from '@services/api';
import { copyObject } from '@utils';
import { FilterTabs } from '@components/organisms';
import { MarketCard } from '@components/molecules';
import styles from './style.module.scss';

const FILTERS: ArtStatusType[] = [
  'allArtworks',
  'processed',
  'onCollaboratorsReview',
  'onGalleryApproval',
  'inMyReview',
  'approval',
  'rejected',
  'approved',
  'published',
];

const FILTER_VALUES: { [key: string]: string } = {
  inMyReview: 'onCollaboratorsReview',
};

const MultisensoryEditor = () => {
  const [search, setSearch] = useSearchParams();
  const filter = search.get('filter');
  const navigate = useNavigate();
  const popup = usePopup();
  const { user, setUser } = useAuth();
  const { _id: myUserId, role } = user || {};

  const { ref, inView } = useInView();

  const prevChangedPage = useRef<number>(1);
  const [arts, setArts] = useState<IMarketArt[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const setFilter = useCallback((filter: string): void => {
    setSearch({ filter });
  }, [setSearch]);

  const afterCreate = (data: IProfileArtType) => {
    setArts(prevState => [...prevState, {
      _id: data['_id'],
      user: data.artist,
      likes: 0,
      price: 0,
      art: data,
    }]);
  };

  const startCreating = () => {
    popup.setData({
      cb: afterCreate,
    });
    popup.open('create_nft');
  };

  const loadArts = useCallback(async () => {
    try {
      if (!myUserId) return;

      const isPageChanged = prevChangedPage.current < currentPage;
      const temp: IMarketArt[] = [];
      const params = {
        status: filter ? FILTER_VALUES[filter] ?? filter : 'allArtworks',
        page: currentPage,
        perPage: 10,
      };

      if (filter === 'allArtworks') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete params.status;
      }

      if (filter === 'onCollaboratorsReview') {
        if (user?.role.name === 'admin') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // params.collaborators = user['_id'];
        }
      }


      if (filter === 'inMyReview') {
        if (user?.role.name === 'admin') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          params.collaborators = user['_id'];
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          params.isCollaborator = true;
        }
      }

      const { data: { arts, hasNextPage } } = (role?.name === 'admin' && filter !== 'onCollaboratorsReview') ?
        await api.art.getAll(params) : await api.users.getUserArt(myUserId, params);

      arts.map((art: IProfileArtType) => {
        temp.push({
          _id: art['_id'],
          user: art.artist,
          likes: art.likes,
          price: art.price,
          art,
        });
      });

      setLoaded(true);
      setHasNextPage(hasNextPage);

      if (isPageChanged) {
        setArts(prevState => [...prevState, ...temp]);
      } else {
        setArts([...temp]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [myUserId, currentPage, filter, role, user]);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prevState => {
        prevChangedPage.current = prevState;
        return prevState + 1;
      });
    }
  }, [hasNextPage]);

  const openPreview = useCallback(async (id: string) => {
    try {
      const { data } = await api.art.getSingle(id);
      const art = data as IProfileArtType;

      if (art.isImage) {
        popup.setData(art.preview);

        popup.open('image');
        return;
      }

      popup.setData({ id, src: art.preview });
      popup.open('art_preview');
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [navigate, popup]);

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

  const editDetails = useCallback(async (id: string) => {
    try {
      popup.setData({ id, cb: editCallback });

      popup.open('edit_details');
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [editCallback, navigate, popup]);

  const openPublish = useCallback(async (art: IProfileArtType) => {
    try {
      const { data } = await api.art.getSingle(art['_id']);

      popup.setData({
        art: data,
        loadFn: loadArts,
      });

      popup.open('art_publish');
    } catch (e) {
      console.log(e);
    }
  }, [popup, loadArts]);

  const resellArt = useCallback(async (art: IProfileArtType) => {
    try {
      const { data } = await api.art.getSingle(art['_id']);

      popup.setData({
        art: data,
        resell: true,
        cb: () => {
          if (!user) return;
          const temp = copyObject(user) as IUser;
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
  }, [popup, user, setUser]);

  // const downloadArt = useCallback(async (id: string) => {
  //   try {
  //     if (!token) return;
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

  useEffect(() => {
    if (!filter) {
      setFilter(FILTERS[0]);
    }

    setCurrentPage(1);
  }, [filter, setFilter]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  useEffect(() => {
    loadArts();
  }, [loadArts]);

  const actions: IArtAction[] = [
    { name: 'Play', fn: openPreview },
    { name: 'Edit', fn: editArt },
    { name: 'Edit Preview', fn: editPreview },
    { name: 'Edit Details', fn: editDetails },
    { name: 'Delete', fn: openRemoval },
    { name: 'Publish', fn: openPublish },
    { name: 'Review', fn: openPublish },
    { name: 'Sell', fn: resellArt },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={styles.profile}>
      <h3 className={styles.profile_title}>My library</h3>
      <h4 className={styles.profile_subtitle}>
        An artwork must be approved by gallery and artinspace. After the approval you can proceed with publishing of
        nft.
      </h4>
      {loaded && !!arts.length && (
        <div className={styles.wrapper}>
          <p className={styles.profile__edit_text}>
            Create new art
          </p>
          <button type="button" className={styles.profile__edit_btn} onClick={startCreating}>
            start
          </button>
        </div>
      )}
      <FilterTabs currentFilter={filter} setFilter={setFilter} filters={FILTERS} />
      {loaded ?
        arts.length ? (
          <Fragment key={arts.length}>
            <div className={styles.profile__block}>
              {arts.map((art, index) => (
                <MarketCard key={index} art={art} actions={actions} showStatus />
              ))}
            </div>
            {loaded && hasNextPage && (
              <div ref={ref} className={styles.profile__loadMore}>
                <Bars height="3em" fill="black" />
              </div>
            )}
          </Fragment>
        ) : (
          <div className={styles.profile__block}>
            <div className={styles.empty_root}>
              <div className={styles.empty_description}>
                <h3 className={styles.empty_description__title}>You don't have any arts yet</h3>
                <h3 className={styles.empty_description__title}>create new?</h3>
                <button type="button" className={styles.profile__edit_btn} onClick={startCreating}>
                  start
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.loading_screen}>
            <Bars fill="#712e19" height={100} />
          </div>
        )}
    </section>
  );
};
export default MultisensoryEditor;
