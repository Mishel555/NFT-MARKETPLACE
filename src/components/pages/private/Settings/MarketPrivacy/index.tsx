import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import api from '@services/api';
import { RichEditor } from '@components/organisms';

import styles from './style.module.scss';

const MarketPrivacy = () => {
  const navigate = useNavigate();
  const [defaultState, setDefaultState] = useState<ContentState | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadContent = useCallback(async () => {
    try {
      const { data } = await api.pages.getPage('marketPrivacy');

      if (data.content) {
        const raw = convertFromRaw(JSON.parse(data.content));
        setDefaultState(raw);
      }

      setIsLoaded(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onSave = useCallback(async (state: ContentState) => {
    try {
      const raw = convertToRaw(state);
      await api.pages.edit('marketPrivacy', {
        content: JSON.stringify(raw),
      });

      toast.success('Content successfully saved');
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [navigate]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      {isLoaded && (
        <RichEditor
          onSave={onSave}
          {...(defaultState && ({ defaultState }))}
        />
      )}
    </div>
  );
};

export default MarketPrivacy;
