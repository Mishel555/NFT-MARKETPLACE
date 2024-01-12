import { useCallback, useEffect, useState } from 'react';
import { convertFromRaw, ContentState } from 'draft-js';
import api from '@services/api';
import { RichContent } from '@components/organisms';

import styles from './style.module.scss';

const TermsAndConditions = () => {
  const [content, setContent] = useState<ContentState | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadContent = useCallback(async () => {
    try {
      const { data } = await api.pages.getPage('marketTerms');

      if (data.content) {
        const raw = convertFromRaw(JSON.parse(data.content));
        setContent(raw);
      }

      setIsLoaded(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadContent();
  }, [loadContent]);

  return (
    <div className={styles.root}>
      {!!content && isLoaded && (
        <RichContent content={content} />
      )}
    </div>
  );
};

export default TermsAndConditions;
