import { useMemo } from 'react';
import classNames from 'classnames';
import { IUser } from '@constants/types';
import { getProfilePublicRoute } from '@utils';
import ImageWithFallback from '../ImageWithFallback';
import InternalLink from '../InternalLink';

import styles from './style.module.scss';

interface IProps {
  gallery: IUser;
  size?: 'sm' | 'md';
}

const GalleryBadge = ({ gallery, size = 'md' }: IProps) => {
  const showName = useMemo(() => gallery.header || gallery.login || '', [gallery]);

  return (
    <div className={classNames(styles.root, styles[`root_${size}`])}>
      <InternalLink
        to={getProfilePublicRoute(gallery['_id'], 'gallery')}
        className={styles.root__label}
      >
        <ImageWithFallback src={gallery.avatar} fallback="defaultAvatar" />
        {showName.length > 14 ? `${showName.slice(0, 15)}...` : showName}
      </InternalLink>
    </div>
  );
};

export default GalleryBadge;
