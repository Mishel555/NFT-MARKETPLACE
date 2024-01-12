import { useEffect, useMemo, useState } from 'react';
import { IExhibition } from '@constants/types';
import { isSourceAvailable } from '@utils';
import { ExhibitionUser } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  data: IExhibition;
}

const MobileIntro = ({
  data,
}: IProps) => {
  const {
    title,
    artists,
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
    <div className={styles.root}>
      {hasImage && (
        <img src={image} alt="event" className={styles.root__image} />
      )}
      <div className={styles.root__info}>
        <h1 className={styles.root__info_title}>{title}</h1>
        {!!artists.length && (
          <ul className={styles.root__artists}>
            {artists.map((user, index) => (
              <ExhibitionUser key={index} user={user} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MobileIntro;
