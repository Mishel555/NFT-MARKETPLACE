import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { IExhibition } from '@constants/types';
import { isSourceAvailable } from '@utils';
import { ExhibitionUser, ExternalLink, GalleryBadge } from '@components/atoms';

import ArrowIcon from '@assets/icons/black-top-right-arrow.svg';
import styles from './style.module.scss';

interface IProps {
  data: IExhibition;
}

const Intro = ({ data }: IProps) => {
  const {
    image,
    title,
    date,
    organizer,
    curatedBy,
    unregisteredCurators,
    url,
    location: {
      city,
      state,
    },
  } = useMemo(() => ({
    ...data,
    date: moment(data.date).format('DD-MM-YYYY'),
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
    <div className={styles.root}>
      <div className={styles.root__image}>
        {hasImage && (
          <img src={image} alt="event" className={styles.root__image_img} />
        )}
        {!!url && (
          <ExternalLink to={url} className={styles.root__image_redirect}>
            <img src={ArrowIcon} alt="redirect" className={styles.root__image_icon} />
          </ExternalLink>
        )}
      </div>
      <h1 className={styles.root__title}>{title}</h1>
      <div className={styles.root__group}>
        <span className={styles.root__group_title}>Date</span>
        <p className={styles.root__group_text}>{date}</p>
      </div>
      {!!(city || state) && (
        <div className={styles.root__group}>
          <span className={styles.root__group_title}>Location</span>
          <p className={styles.root__group_text}>{city} {state}</p>
        </div>
      )}
      {!!(curatedBy.length || unregisteredCurators.length) && (
        <div className={styles.root__group}>
          <span className={styles.root__group_title}>CuratedBy</span>
          <ul className={styles.root__wrapper}>
            {[...curatedBy, ...unregisteredCurators].map((user, index) => (
              <ExhibitionUser key={index} user={user} />
            ))}
          </ul>
        </div>
      )}
      {organizer && (
        <div className={styles.root__group}>
          <span className={styles.root__group_title}>Created by</span>
          <GalleryBadge gallery={organizer} />
        </div>
      )}
    </div>
  );
};

export default Intro;
