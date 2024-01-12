import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { IExhibition } from '@constants/types';
import { isSourceAvailable } from '@utils';
import { ExhibitionUser, ExternalLink, GalleryBadge } from '@components/atoms';

import ArrowIcon from '@assets/icons/black-top-right-arrow.svg';
import TrashIcon from '@assets/icons/trash-black-icon.svg';
import EditIcon from '@assets/icons/settings/exhibition-edit-icon.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  data: IExhibition;
  close: () => void;
  deleteExhibition?: (id: string) => void;
  editExhibition?: (id: string) => void;
}

const Full = ({
  data,
  close,
  deleteExhibition,
  editExhibition,
}: IProps) => {
  const {
    _id,
    title,
    date,
    artists,
    unregisteredArtists,
    location: {
      city,
      state,
    },
    curatedBy,
    unregisteredCurators,
    description,
    organizer,
    url,
    image,
  } = useMemo(() => ({
    ...data,
    unregisteredArtists: data.sArtists?.split(',') || [],
    unregisteredCurators: data.sCuratedBy?.split(',') || [],
  }), [data]);

  const [hasImage, setHasImage] = useState<boolean>(false);

  useEffect(() => {
    if (image) {
      isSourceAvailable(image).then(success => {
        if (success) {
          setHasImage(true);
        }
      });
    }
  }, [image]);

  return (
    <div onClick={close} className={classNames(styles.root, animatedStyles.born_via_fade)}>
      <div className={styles.root__top}>
        <div className={styles.root__top_info}>
          <h1 className={styles.root__title}>{title}</h1>
          <div className={styles.root__group}>
            <span className={styles.root__label}>Date</span>
            <p className={styles.root__text}>
              {moment(date).format('DD-MM-YYYY')}
            </p>
          </div>
          {(city || state) && (
            <div className={styles.root__group}>
              <span className={styles.root__label}>Location</span>
              <p className={styles.root__text}>
                {city} {state}
              </p>
            </div>
          )}
          {!!(curatedBy.length || unregisteredCurators.length) && (
            <div className={styles.root__artists}>
              <span className={styles.root__label}>Curated By</span>
              <ul className={styles.root__artists_wrapper}>
                {[...curatedBy, ...unregisteredCurators].map((user, index) => (
                  <ExhibitionUser key={index} user={user} />
                ))}
              </ul>
            </div>
          )}
          {!!organizer && (
            <div className={styles.root__group}>
              <span className={styles.root__label}>Created by</span>
              <GalleryBadge gallery={organizer} />
            </div>
          )}
        </div>
        {hasImage && (
          <div className={styles.root__top_image}>
            <img src={image} alt="event" />
          </div>
        )}
      </div>
      <div className={styles.root__bottom}>
        {!!(artists?.length || unregisteredArtists?.length) && (
          <div className={styles.root__artists}>
            <span className={styles.root__label}>Artists</span>
            <ul className={styles.root__artists_wrapper}>
              {[...artists, ...unregisteredArtists].map((user, index) => (
                <ExhibitionUser key={index} user={user} />
              ))}
            </ul>
          </div>
        )}
        {description && (
          <div className={styles.root__artists}>
            <span className={styles.root__label}>Description</span>
            <p>{description}</p>
          </div>
        )}
      </div>
      <div className={styles.root__actions}>
        {editExhibition && (
          <button type="button" onClick={() => editExhibition(_id)} className={styles.root__actions_btn}>
            <img src={EditIcon} alt="edit" />
          </button>
        )}
        {deleteExhibition && (
          <button type="button" onClick={() => deleteExhibition(_id)} className={styles.root__actions_btn}>
            <img src={TrashIcon} alt="delete" />
          </button>
        )}
        {!!url && (
          <ExternalLink to={url} className={styles.root__actions_btn}>
            <img src={ArrowIcon} alt="redirect" />
          </ExternalLink>
        )}
      </div>
    </div>
  );
};

export default Full;
