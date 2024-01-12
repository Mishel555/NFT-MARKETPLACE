import ProfileActions from '../ProfileActions';
import { ImageWithFallback } from '@components/atoms';
import styles from './style.module.scss';

interface IProps {
  coverSrc: string;
  avatarSrc: string;
  isPublic: boolean;
}

const ProfileIntro = ({
  coverSrc,
  avatarSrc,
  isPublic,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__cover}>
      <ImageWithFallback src={coverSrc} fallback="defaultBanner" />
    </div>
    <div className={styles.root__wrapper}>
      <div className={styles.root__profile}>
        <ImageWithFallback src={avatarSrc} fallback="defaultAvatar" />
      </div>
      {!isPublic && (
        <div className={styles.root__actions}>
          <ProfileActions />
        </div>
      )}
    </div>
  </div>
);

export default ProfileIntro;
