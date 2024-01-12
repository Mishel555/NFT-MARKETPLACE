import { ImageWithFallback } from '@components/atoms';
import classNames from 'classnames';

import styles from './style.module.scss';

interface IPropTypes {
  id: string;
  title: string;
  avatar: string;
  banner: string;
  description: string;
  selectedGallery: string;
  selectGallery: (id: string) => void;
}

const GalleryItem = ({
  id,
  title,
  avatar,
  banner,
  description,
  selectedGallery,
  selectGallery,
}: IPropTypes) => (
  <div
    onClick={() => selectGallery(id)}
    className={classNames(
      styles.root, selectedGallery && (id === selectedGallery ? styles.root_active : styles.root_disabled)
    )}
  >
    <div className={styles.root__images}>
      <ImageWithFallback className={styles.root__images_banner} src={banner} fallback="defaultBanner" />
      <ImageWithFallback className={styles.root__images_avatar} src={avatar} fallback="defaultAvatar" />
    </div>
    <div className={styles.root__info}>
      <p className={styles.root__info_title}>
        {title}
      </p>
      <p className={styles.root__info_text}>
        {description}
      </p>
    </div>
  </div>
);

export default GalleryItem;
