import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Bars } from 'react-loading-icons';
import api from '@services/api';
import CollapseItem from './CollapseItem';

import styles from './style.module.scss';

interface IData {
  question: string;
  answer: string;
}

const Faq = () => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [data, setData] = useState<IData[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    try {
      const { data } = await api.pages.getPage('faq');

      setData(data.content);
      timer.current = setTimeout(() => {
        setLoaded(true);
      }, 1500);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [loadData]);

  return (
    <section className={styles.root}>
      {loaded ? (
        <Fragment>
          <h1 className={styles.root__title}>
            FREQUENTLY ASKED QUESTIONS (FAQ)
          </h1>
          <div className={styles.root__wrapper}>
            {data?.map((data, index) => (
              <CollapseItem key={index} {...data} />
            ))}
          </div>
        </Fragment>
      ) : (
        <div className={styles.root__loading}>
          <Bars height={100} fill="#e4dcfd" />
        </div>
      )}
    </section>
  );
};

export default Faq;
