import { useEffect, useState } from 'react';
import { IGalleryUser, IUser } from '@constants/types';
import api from '@services/api';
import GalleryItem from '../GalleryItem';

import styles from './style.module.scss';

interface IPropTypes {
  setGallery: (id: string) => void;
}

const GalleryList = ({ setGallery }: IPropTypes) => {
  const [galleries, setGalleries] = useState<IUser[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<string>('');
  const [defaultGallery, setDefaultGallery] = useState<string>('');

  const selectGallery = (id: string): void => {
    if (id === selectedGallery) {
      setGallery(defaultGallery);
      setSelectedGallery('');
    } else {
      setGallery(id);
      setSelectedGallery(id);
    }
  };

  useEffect(() => {
    let mounted = true;

    api.users.getAll({
      role: 'gallery',
      approved: true,
      pagination: false,
    }).then(({ data }) => {
      if (mounted) {
        setDefaultGallery(data.users.filter((gallery: IGalleryUser) => gallery.isDefault)[0]._id);
        setGalleries(data.users.filter((gallery: IGalleryUser) => !gallery.isDefault));
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.root}>
      {galleries.filter(gallery => !gallery.isDefault).map(({
        _id,
        header,
        description,
        banner,
        avatar,
      }, index) => (
        <GalleryItem
          key={index}
          id={_id}
          title={header ?? ''}
          avatar={avatar}
          banner={banner}
          description={description ?? ''}
          selectedGallery={selectedGallery}
          selectGallery={selectGallery}
        />
      ))}
    </div>
  );
};

export default GalleryList;
