import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import api from '@services/api';
import { IProfileArtType } from '@constants/types';
import { useAuth, usePopup } from '@hooks';
import { ImageViewer, SingleArtPlayer } from '@components/organisms';
import InfoSection from './InfoSection';
import Loading from './Loading';

import styles from './style.module.scss';

const SingleArt = () => {
  const popup = usePopup();
  const { id } = useParams();
  const { user } = useAuth();

  const [art, setArt] = useState<IProfileArtType | null>(null);

  const [videoSrc, setVideoSrc] = useState<string>();
  const [hqUrl, setHqUrl] = useState<string | null>(null);

  const availableHQ = useMemo<boolean>(() => {
    if (!user || !art) return false;

    if (user.role.name === 'admin') return true;

    if (art.artist['_id'] === user['_id'] || (art.artist.gallery && art.artist.gallery['_id']) === user['_id']) {
      return true;
    }

    const ownedIndex = art.copies?.findIndex(nft => nft.owner === user['_id']) || -1;

    return ownedIndex >= 0;
  }, [user, art]);

  const loadArt = useCallback(async () => {
    try {
      if (id) {
        const { data } = await api.art.getSingle(id);

        if (availableHQ) {
          const { data: urlData } = await api.art.getHQUrl(id);
          setHqUrl(urlData.url);
        }

        setArt(data);
        setVideoSrc(data.preview);
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, user, availableHQ]);

  useEffect(() => {
    loadArt();
  }, [loadArt]);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      popup.close();
    };
  }, []);

  return (
    <Fragment>
      <div className={classNames(styles.root, styles.root_loaded)}>
        {art && videoSrc && (
          <div className={styles.root__wrapper}>
            {!art.isImage ? (
              <SingleArtPlayer
                src={videoSrc}
                poster={art.thumb}
                hqSrc={hqUrl}
                availableHQ={availableHQ}
              />
            ) : (
              <ImageViewer src={art.image} allowFull />
            )}
            <InfoSection art={art} />
          </div>
        )}
      </div>
      <div className={classNames(styles.root__loading, styles.root__loading_loaded)}>
        <Loading />
      </div>
    </Fragment>
  );
};

export default SingleArt;
