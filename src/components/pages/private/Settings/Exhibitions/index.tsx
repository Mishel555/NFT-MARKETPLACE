import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IExhibition, IExhibitionSubmitArgs, IUser } from '@constants/types';
import { usePopup } from '@hooks';
import api from '@services/api';
import { ExhibitionItem, ExhibitionForm } from '@components/organisms';
import Toolbar from './Toolbar';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

const Exhibitions = ({ user }: IProps) => {
  const popup = usePopup();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [items, setItems] = useState<IExhibition[]>([]);

  const [availableCreate, setAvailableCreate] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const createExhibition = useCallback(() => {
    setAvailableCreate(false);
    setItems(prevState => [{
      _id: String(prevState.length),
      title: '',
      description: '',
      date: String(new Date()),
      location: {},
      artists: [],
      curatedBy: [],
      organizer: user,
      isEditable: true,
    }, ...prevState]);
  }, [user]);

  const deleteExhibition = useCallback(async (id: string) => {
    try {
      const temp = [...items].filter(item => item['_id'] !== id);
      setItems(temp);

      await api.events.delete(id);
      toast.success('Exhibitions successfully deleted');
    } catch (e) {
      const error = e as AxiosError;

      toast.error(`${error.response?.statusText}, please try again...`);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
      console.log(e);
    }
  }, [items, navigate]);

  const saveExhibition = useCallback(async (values: IExhibitionSubmitArgs) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      formData.append('date', values.date);
      formData.append('url', values.url || '');
      formData.append('location.city', values.city || '');
      formData.append('location.state', values.state || '');
      formData.append('sArtists', values.sArtists || '');
      formData.append('sCuratedBy', values.sCuratedBy || '');

      if (!values.preview) {
        formData.append('deleteFile', 'true');
      }

      if (values.image) {
        formData.append('file', values.image);
      }

      if (values.artists?.length) {
        values.artists.forEach((id) => formData.append('artists[]', id));
      } else {
        formData.append('artists[]', '');
      }

      if (values.curatedBy?.length) {
        values.curatedBy.forEach((id) => formData.append('curatedBy[]', id));
      } else {
        formData.append('curatedBy[]', '');
      }

      const tempExhibitions = [...items];
      const foundedIndex = tempExhibitions.findIndex(item => item['_id'] === values['_id']);

      const { data } = tempExhibitions[foundedIndex].createdAt ?
        await api.events.edit(tempExhibitions[foundedIndex]['_id'], formData)
        : await api.events.add(formData);

      if (foundedIndex > -1) {
        tempExhibitions[foundedIndex] = {
          ...data,
          isEditable: false,
          organizer: user,
        };
      }

      setAvailableCreate(true);
      setItems([...tempExhibitions]);
      toast.success('Exhibition successfully saved');
    } catch (e) {
      const error = e as AxiosError;

      toast.error(`${error.response?.statusText}, please try again...`);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
      console.log(e);
    }
  }, [items, user, navigate]);

  const editExhibition = useCallback((id: string) => {
    const temp = [...items];
    const foundedIndex = temp.findIndex(item => item['_id'] === id);
    temp[foundedIndex].isEditable = true;

    setAvailableCreate(false);
    setItems([...temp]);
  }, [items]);

  const cancelEdit = useCallback((id: string) => {
    const temp = [...items];
    const foundedIndex = temp.findIndex(item => item['_id'] === id);

    if (foundedIndex < 0) {
      setAvailableCreate(true);
      return;
    }

    if (temp[foundedIndex].createdAt) {
      temp[foundedIndex].isEditable = false;
      setAvailableCreate(true);
      return;
    }

    temp.splice(foundedIndex, 1);

    setItems([...temp]);
    setAvailableCreate(true);
  }, [items]);

  const openDelete = useCallback((id: string) => {
    popup.setData({
      confirm: () => deleteExhibition(id),
      firstMessage: 'You are about to delete exhibition.',
      secondMessage: 'This exhibition cannot be recovered.',
    });
    popup.open('delete_confirm');
  }, [deleteExhibition, popup]);

  const loadExhibitions = useCallback(async () => {
    try {
      const params = {
        ...Object.fromEntries(searchParams.entries()),
        perPage: 10,
        page: currentPage,
      };

      const {
        data: {
          events,
          hasNextPage,
        },
      } = await api.events.getUserEvents(user['_id'], params);

      if (currentPage > 1) {
        setItems(prevState => [...prevState, ...events]);
      } else {
        setItems(events);
      }

      setHasNextPage(hasNextPage);
    } catch (e) {
      console.log(e);
    }
  }, [searchParams, currentPage, user]);

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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <Toolbar availableCreate={availableCreate} create={createExhibition} />
      <div>
        <h2 className={styles.root__subTitle}>
          Exhibitions
        </h2>
        <div className={styles.root__wrapper}>
          {items.map(data => data.isEditable ? (
            <ExhibitionForm
              key={data['_id']}
              defaultValues={data}
              save={saveExhibition}
              cancel={cancelEdit}
            />
          ) : (
            <ExhibitionItem
              key={data['_id']}
              data={data}
              size="sm"
              editExhibition={editExhibition}
              deleteExhibition={openDelete}
            />
          ))}
        </div>
        {hasNextPage && (
          <button onClick={loadMore} className={styles.root__more}>
            load more
          </button>
        )}
      </div>
    </div>
  );
};

export default Exhibitions;
