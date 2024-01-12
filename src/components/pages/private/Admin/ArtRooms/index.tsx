import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth, usePopup } from '@hooks';
import api from '@services/api';
import MainForm from './MainForm';
import RoomItem from './RoomItem';

import AddIcon from '@assets/icons/grey-add-icon.svg';
import styles from '../style.module.scss';

interface IResponseImage {
  _id: string;
  thumb: string;
  full: string;
}

interface IRoom {
  _id: string;
  title: string;
  description: string;
  ip: string;
  location: string;
  photos: IResponseImage[];
}

interface IPageInfo {
  title: string;
  description: string;
}

const initialData = {
  title: 'Art Rooms',
  slug: 'artrooms',
  content: {
    title: 'initial title',
    description: 'initial description',
  },
};

const ArtRooms = () => {
  const path = useLocation().pathname.replace('/settings/', '');

  const { logOut } = useAuth();
  const popupController = usePopup();

  const [pageInfo, setPageInfo] = useState<IPageInfo | null>(null);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [newItem, setNewItem] = useState<boolean>(false);

  const addRoom = async (values: FormData) => {
    try {
      const { data } = await api.rooms.add(values);
      popupController.setData('Art Room has been saved.');
      popupController.open('notification');

      setNewItem(false);
      setRooms(prevState => [...prevState, data]);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const removeRoom = async (id: string) => {
    try {
      await api.rooms.remove(id);
      const temp = [...rooms].filter(({ _id }) => _id !== id);
      setRooms([...temp]);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const edit = async (id: string, values: FormData) => {
    try {
      await api.rooms.edit(id, values);
      popupController.setData('Art Room has been saved.');
      popupController.open('notification');
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const { data: page } = await api.pages.getPage(path);
        const { data: rooms } = await api.rooms.getAll();

        if (mounted) {
          setPageInfo(page.content);
          setRooms(rooms);
        }
      } catch (e) {
        const error = e as AxiosError;

        if (error.response?.data.message === 'page not found') {
          await api.pages.add(initialData);
        }
      }
    };

    fetchData();
    window.scrollTo(0, 0);

    return () => {
      mounted = false;
    };
  }, [path]);

  return (
    <div className={styles.admin__template}>
      <h1 className={styles.admin__main_title}>
        main Title
      </h1>
      <div className={styles.admin__template_room}>
        <MainForm
          defaultTitle={pageInfo?.title ? pageInfo.title : ''}
          defaultDescription={pageInfo?.description ? pageInfo.description : ''}
        />
        <h1 className={styles.admin__main_title}>
          About Rooms
        </h1>
        {rooms.map((
          {
            _id,
            title,
            description,
            ip,
            location,
            photos,
          }, index,
        ) => (
          <RoomItem
            key={index}
            id={_id}
            defaultTitle={title}
            defaultDescription={description}
            defaultIp={ip}
            defaultAddress={location}
            defaultImages={photos}
            edit={edit}
            remove={removeRoom}
          />
        ))}
        <button className={styles.admin__faq_add} onClick={() => setNewItem(!newItem)}>
          add a new room
          <img src={AddIcon} alt="" />
        </button>
        {newItem ? (
          <RoomItem add={addRoom} remove={() => setNewItem(false)} />
        ) : null}
      </div>
    </div>
  );
};

export default ArtRooms;
