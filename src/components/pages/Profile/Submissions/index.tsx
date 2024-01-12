import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Bars } from 'react-loading-icons';
import { AxiosError } from 'axios';
import api from '@services/api';
import { useAuth, usePopup } from '@hooks';
import { ArtStatusType, IArtAction, IMarketArt, IProfileArtType, IUser } from '@constants/types';
import { MarketCard, ShowRoomFilters } from '@components/molecules';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

const FILTERS: ArtStatusType[] = [
  'onGalleryApproval',
  'approved',
  'galleryDefault',
  'rejected',
];

const Submissions = ({ user }: IProps) => {
  const { ref, inView } = useInView();

  const { user: loggedUser, setUser } = useAuth();
  const popup = usePopup();
  const navigate = useNavigate();

  const prevChangedPage = useRef<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [arts, setArts] = useState<IMarketArt[]>([]);
  const [filter, setFilter] = useState<ArtStatusType>('onGalleryApproval');

  const playArt = async (id: string) => {
    try {
      const { data } = await api.art.getSingle(id);
      const art = data as IProfileArtType;

      if (art.isImage) {
        popup.setData(art.preview);

        return popup.open('image');
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
  };

  const loadArts = useCallback(async () => {
    try {
      if (user) {
        const isPageChanged = prevChangedPage.current < currentPage;
        const params = {
          ...(filter === 'galleryDefault' && ({
            status: 'processed,approved,rejected,onCollaboratorsReview',
          })),
          perPage: 9,
          page: currentPage,
          ...(filter === 'rejected' && ({
            isRejected: true,
            collaborators: user['_id'],
          })),
          ...(filter === 'approved' && ({ isApproved: true })),
          ...(filter === 'onGalleryApproval' && ({ toApprove: true })),
          ...((filter === 'approved' || filter === 'onGalleryApproval') && ({
            collaborators: user['_id'],
          })),
        };

        const { data: { arts, hasNextPage, totalDocs } } = await api.art.getArtsOfMembers(user['_id'], params);
        const temp: IMarketArt[] = [];

        arts.map((data: IProfileArtType) => {
          temp.push({
            _id: data['_id'],
            user: data.artist,
            price: data.price,
            likes: data.likes,
            art: data,
          });
        });

        if (isPageChanged) {
          setArts(prevState => [...prevState, ...temp]);
        } else {
          setArts(temp);
        }

        if (loggedUser?.artSubmissions !== totalDocs) {
          setUser({ ...loggedUser, artSubmissions: totalDocs } as IUser);
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
  }, [user, currentPage, filter, loggedUser, setUser, navigate]);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prevState => {
        prevChangedPage.current = prevState;
        return prevState + 1;
      });
    }
  }, [hasNextPage]);

  const openPublish = async (art: IProfileArtType) => {
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
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  useEffect(() => {
    loadArts();
  }, [loadArts]);

  const actions: IArtAction[] = [
    { name: 'Play', fn: playArt },
    { name: 'Review', fn: openPublish },
  ];

  return (
    <div className={styles.root}>
      <ShowRoomFilters
        filters={FILTERS}
        currentFilter={filter}
        changeFilter={(newFilter) => setFilter(newFilter as ArtStatusType)}
      />
      <div className={styles.root__wrapper}>
        {arts?.map((art, index) => (
          <MarketCard key={index} art={art} actions={actions} showStatus />
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

export default Submissions;
