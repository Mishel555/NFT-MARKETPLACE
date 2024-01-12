import { ArtType, IUser } from '@constants/types';
import { getProfilePublicRoute } from '@utils';
import { InternalLink } from '@components/atoms';
import { ImageViewer, SingleArtPlayer } from '@components/organisms';
import styles from './style.module.scss';

interface IProps {
  src: string;
  type: ArtType;
  title: string;
  creator: IUser;
}

const Preview = ({
  src,
  type,
  title,
  creator,
}: IProps) => (
  <div className={styles.root}>
    <InternalLink to={getProfilePublicRoute(creator['_id'], creator.role.name)} className={styles.root__title}>
      @{creator.header ?? creator.login}
    </InternalLink>

    <h1 className={styles.root__title}>{title}</h1>
    {type === 'video' ? <SingleArtPlayer src={src} /> : <ImageViewer src={src} />}
  </div>
);

export default Preview;
