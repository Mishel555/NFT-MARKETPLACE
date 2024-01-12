import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { AxiosError } from 'axios';
import { IBanner, IBannersResponse } from '@constants/types';
import { usePopup } from '@hooks';
import api from '@services/api';
import BannerItem from './BannerItem';

import AddIcon from '@assets/icons/grey-add-icon.svg';
import styles from './style.module.scss';

const generateBanner = (id: number): IBanner => ({
  _id: id.toString(),
  title: {
    label: '',
    color: '#fff',
  },
  description: {
    label: '',
    color: '#fff',
  },
  countdown: {
    endsAt: '',
    color: '#fff',
  },
  url: '',
  image: '',
});

const Banners = () => {
  const navigate = useNavigate();
  const popup = usePopup();

  const [items, setItems] = useState<IBanner[]>([]);

  const createBanner = useCallback(() => {
    setItems(prevState => [...prevState, generateBanner(prevState.length)]);
  }, []);

  const deleteBanner = useCallback(async (id: string) => {
    try {
      const temp = items.filter(item => item['_id'] !== id);
      const item = items.find(item => item['_id'] === id);

      // !if mongo ID
      if (item && item['_id'].length < 5) {
        toast.success('Banner successfully deleted');
        setItems(temp);
        return;
      }

      await api.banners.delete(id);
      toast.success('Banner successfully deleted');
      setItems(temp);
    } catch (e) {
      const error = e as AxiosError;

      toast.error(`${error.response?.statusText}, please try again...`);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
      console.log(e);
    }
  }, [items, navigate]);

  const openDelete = useCallback((id: string) => {
    popup.open('delete_confirm');
    popup.setData({
      confirm: () => deleteBanner(id),
      firstMessage: 'You are about to delete Banner.',
      secondMessage: 'This banner cannot be recovered.',
    });
  }, [popup, deleteBanner]);

  const saveBanner = useCallback(async (banner: IBanner) => {
    try {
      const temp = [...items];
      const bannerIndex = items.findIndex(({ _id }) => _id === banner['_id']);
      if (bannerIndex < 0) {
        return;
      }

      const formData = new FormData();

      if (banner.title) {
        formData.append('title', banner.title.label || '');
        formData.append('titleColor', banner.title.color);
      }

      if (banner.description) {
        formData.append('descr', banner.description.label || '');
        formData.append('descrColor', banner.description.color);
      }

      if (banner.countdown) {
        formData.append('countdownColor', banner.countdown.color);
        formData.append('endsAt', new Date(banner.countdown.endsAt).toISOString());
      }

      if (banner.buttonName) {
        formData.append('buttonName', banner.buttonName);
      }

      if (banner.url) {
        formData.append('link', banner.url);
      }

      if (typeof banner.image !== 'string') {
        formData.append('file', banner.image);
      }

      const { data: response } = temp[bannerIndex]['__v'] !== undefined ? await api.banners.edit(banner['_id'], formData)
        : await api.banners.add(formData);

      toast.success('Banners successfully updated...');

      temp.splice(bannerIndex, 1, {
        ...banner,
        _id: response['_id'],
        __v: response['__v'],
      });
      setItems(temp);
    } catch (e) {
      const error = e as AxiosError;

      toast.error(`${error.response?.statusText}, please try again...`);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
      console.log(e);
    }
  }, [items, navigate]);

  const loadBanners = useCallback(async () => {
    try {
      const { data } = await api.banners.getAll();
      const temp = data as IBannersResponse[];

      setItems(temp.map((banner) => ({
        _id: banner['_id'],
        __v: banner['__v'],
        image: banner.image,
        ...(banner.link && ({ url: (banner.link) })),
        ...(banner.buttonName && ({ buttonName: banner.buttonName })),
        ...(banner.title && ({
          title: {
            label: banner.title || '',
            color: banner.titleColor,
          },
        })),
        ...(banner.descr && ({
          description: {
            label: banner.descr || '',
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
      const error = e as AxiosError;
      if (error.response?.status === 401) {
        navigate('/signIn');
      }
      console.log(e);
    }
  }, [navigate]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => popup.close();

    // DO NOT REMOVE NEXT LINE
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.root}>
      <h2 className={styles.root__title}>
        Manage Banner
      </h2>
      {items.map((item, index) => (
        <BannerItem
          key={index + item['_id']}
          banner={item}
          saveBanner={saveBanner}
          deleteBanner={openDelete}
        />
      ))}
      <div className={styles.root__creator}>
        <button onClick={createBanner} className={styles.root__creator_btn}>
          Add a new banner
          <img src={AddIcon} alt="add" />
        </button>
      </div>
    </div>
  );
};

export default Banners;
