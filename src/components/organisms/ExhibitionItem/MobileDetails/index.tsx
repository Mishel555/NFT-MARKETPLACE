import { useMemo } from 'react';
import moment from 'moment';
import { IExhibition } from '@constants/types';
import { ExternalLink, GalleryBadge } from '@components/atoms';

import ArrowIcon from '@assets/icons/black-top-right-arrow.svg';
import TrashIcon from '@assets/icons/trash-black-icon.svg';
import EditIcon from '@assets/icons/settings/exhibition-edit-icon.svg';
import styles from './style.module.scss';

interface IProps {
  data: IExhibition;
  deleteExhibition?: (id: string) => void;
  editExhibition?: (id: string) => void;
}

const MobileDetails = ({
  data,
  deleteExhibition,
  editExhibition,
}: IProps) => {
  const {
    _id,
    date,
    organizer,
    url,
    location: {
      city,
      state,
    },
  } = useMemo(() => ({
    ...data,
    date: moment(data.date).format('DD-MM-YYYY'),
  }), [data]);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <div>
          <span className={styles.root__wrapper_label}>Date</span>
          <p className={styles.root__wrapper_text}>{date}</p>
        </div>
        {!!(city || state) && (
          <div>
            <span className={styles.root__wrapper_label}>Location</span>
            <p className={styles.root__wrapper_text}>{city} {state}</p>
          </div>
        )}
      </div>
      <div className={styles.root__wrapper}>
        {organizer && (
          <div>
            <span className={styles.root__wrapper_label}>Created by</span>
            <GalleryBadge gallery={organizer} />
          </div>
        )}
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
    </div>
  );
};

export default MobileDetails;
