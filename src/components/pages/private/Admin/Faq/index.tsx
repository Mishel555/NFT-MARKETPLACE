import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';
import { Bars } from 'react-loading-icons';
import { AxiosError } from 'axios';
import { useAuth, usePopup } from '@hooks';
import api from '@services/api';
import QuestionItem from './QuestionItem';

import AddIcon from '@assets/icons/grey-add-icon.svg';
import styles from '../style.module.scss';

interface IFaq {
  id: number;
  question: string;
  answer: string;
}

const initialData = {
  title: 'Faq Page',
  slug: 'faq',
  content: [],
};
const Faq = () => {
  const location = useLocation();
  const path = location.pathname.replace('/settings/', '');
  const { logOut } = useAuth();
  const popupController = usePopup();

  const [newItem, setNewItem] = useState<boolean>(false);
  const [data, setData] = useState<IFaq[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const add = async (values: FieldValues) => {
    try {
      const temp = values as IFaq;
      temp.id = data.length;

      await api.pages.edit(path, { content: [...data, temp] });
      popupController.setData('Faq has been saved');
      popupController.open('notification');

      setData([...data, temp]);
      setNewItem(false);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const update = async (id: number, values: FieldValues) => {
    try {
      const temp = [...data];
      const index = temp.findIndex(el => el.id === id);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      temp[index] = { id: data[index].id, ...values };

      await api.pages.edit(path, { content: temp });
      popupController.setData('Faq has been saved');
      popupController.open('notification');

      setData([...temp]);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const remove = async (id: number) => {
    try {
      const temp = [...data].filter((faq: IFaq) => faq.id !== id);

      await api.pages.edit(path, {
        content: temp,
      });

      setData([...temp]);
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
        const { data } = await api.pages.getPage(path);

        if (mounted) {
          setData(data.content);
          setLoaded(true);
        }
      } catch (e) {
        const error = e as AxiosError;
        if (error.response?.data.message === 'page not found') {
          await api.pages.add(initialData);
        }
        console.log(e);
      }
    };

    fetchData();
    window.scrollTo(0, 0);

    return () => {
      mounted = false;
    };
  }, [path, setData]);

  return (
    <div className={styles.admin__template}>
      <div className={styles.admin__faq} key={data.length}>
        {loaded ? (
          data?.map((
            {
              id,
              question,
              answer,
            }, index,
          ) => (
            <QuestionItem
              key={index}
              id={id}
              defaultQuestion={question}
              defaultAnswer={answer}
              add={add}
              remove={remove}
              update={update}
            />
          ))
        ) : (
          <div className={styles.loading_box}>
            <Bars height={100} fill="#712e19" />
          </div>
        )}

        <button className={styles.admin__faq_add} onClick={() => setNewItem(true)}>
          add a new Question
          <img src={AddIcon} alt="" />
        </button>
        {newItem ? (
          <QuestionItem
            add={add}
            hide={() => setNewItem(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Faq;
