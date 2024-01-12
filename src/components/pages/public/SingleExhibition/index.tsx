import { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IExhibition } from '@constants/types';
import api from '@services/api';
import Loading from './Loading';
import Intro from './Intro';
import Details from './Details';

import styles from './style.module.scss';

const SingleExhibition = () => {
  const { id } = useParams();

  const [exhibition, setExhibition] = useState<IExhibition | null>(null);

  const getExhibition = useCallback(async () => {
    try {
      if (!id) {
        return;
      }

      const { data } = await api.events.getSingle(id);

      setExhibition(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    getExhibition();
  }, [getExhibition]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      {exhibition ? (
        <Fragment>
          <Intro data={exhibition} />
          {!!(exhibition.artists?.length || exhibition.sArtists?.length || exhibition.description) && (
            <Details
              artists={[...exhibition.artists, ...(exhibition.sArtists?.split(',') || [])]}
              description={exhibition.description}
            />
          )}
        </Fragment>
      ) : <Loading />}
    </div>
  );
};

export default SingleExhibition;
