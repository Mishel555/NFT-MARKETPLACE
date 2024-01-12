import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import api from '@services/api';
import { IProfileArtType } from '@constants/types';
import { useAuth, usePopup } from '@hooks';
import { ImageViewer, SingleArtPlayer } from '@components/organisms';
import InfoSection from './InfoSection';
import OtherPlans from './OtherPlans';
import Loading from './Loading';

import styles from './style.module.scss';

const SingleMembership = () => {
  const popup = usePopup();
  const { id } = useParams();
  const { user } = useAuth();

  const [membership, setMembership] = useState<IProfileArtType | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [hqUrl, setHqUrl] = useState<string | null>(null);

  const availableHQ = useMemo<boolean>(() => {
    if (!user || !membership) {
      return false;
    }

    if (user.role.name === 'admin') {
      return true;
    }

    const ownedIndex = membership.copies?.findIndex(nft => nft.owner === user['_id']) || -1;

    return ownedIndex >= 0;
  }, [user, membership]);

  const onVideoLoad = useCallback(() => {
  }, []);

  const loadArt = useCallback(async () => {
    try {
      if (id) {
        const { data } = await api.art.getSingle(id);

        if (availableHQ) {
          const { data: urlData } = await api.art.getHQUrl(id);
          setHqUrl(urlData.url);
        }

        setMembership(data);
        setVideoSrc(data.preview);
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, availableHQ, user]);

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
        {membership && videoSrc && (
          <div className={styles.root__wrapper}>
            {!membership.isImage ? (
              <SingleArtPlayer
                src={videoSrc}
                poster={membership.thumb}
                hqSrc={hqUrl}
                availableHQ={availableHQ}
                onLoad={onVideoLoad}
              />
            ) : (
              <ImageViewer src={membership.image} allowFull />
            )}
            <InfoSection art={membership} />
            <OtherPlans />
          </div>
        )}
      </div>
      <div
        className={classNames(
          styles.root__loading,
          styles.root__loading_loaded,
        )}
      >
        <Loading />
      </div>
    </Fragment>
  );
};

export default SingleMembership;
