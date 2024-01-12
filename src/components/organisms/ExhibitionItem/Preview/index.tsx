import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { isSourceAvailable } from '@utils';
import { IExhibition } from '@constants/types';
import { ExhibitionUser, ExternalLink, GalleryBadge } from '@components/atoms';

import ArrowIcon from '@assets/icons/black-top-right-arrow.svg';
import TrashIcon from '@assets/icons/trash-black-icon.svg';
import EditIcon from '@assets/icons/settings/exhibition-edit-icon.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  data: IExhibition;
  size: 'sm' | 'md';
  open: () => void;
  deleteExhibition?: (id: string) => void;
  editExhibition?: (id: string) => void;
}

const Preview = ({
  data,
  size,
  open,
  deleteExhibition,
  editExhibition,
}: IProps) => {
  const {
    _id,
    title,
    date,
    url,
    location: {
      city,
      state,
    },
    artists,
    organizer,
    image,
  } = useMemo(() => data, [data]);

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
    <div onClick={open} className={classNames(styles.root, animatedStyles.die_via_fade)}>
      <div className={styles.root__info}>
        <div className={styles.root__info_main}>
          <h1 className={styles.root__info_title}>{title}</h1>
          <ul className={styles.root__info_wrapper}>
            {artists?.map((user, index) => (
              <ExhibitionUser key={index} user={user} />
            ))}
          </ul>
        </div>
        <div className={styles.root__info_meta}>
          <div>
            <span className={styles.root__info_label}>Date</span>
            <p className={styles.root__info_text}>
              {moment(date).format('DD-MM-YYYY')}
            </p>
          </div>
          {(city || state) && (
            <div>
              <span className={styles.root__info_label}>Location</span>
              <p className={styles.root__info_text}>
                {city} {state}
              </p>
            </div>
          )}
          {organizer && (
            <div>
              <span className={styles.root__info_label}>Created By</span>
              <GalleryBadge gallery={organizer} />
            </div>
          )}
        </div>
      </div>
      {hasImage && (
        <div className={classNames(styles.root__image, styles[`root__image_${size}`])}>
          <img src={image} alt="event" className={styles.root__image_preview} />
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
      )}
      {!hasImage && (
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
      )}
    </div>
  );
};

export default Preview;
