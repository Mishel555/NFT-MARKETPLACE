import { useMemo } from 'react';
import { IUser } from '@constants/types';
import { getProfilePublicRoute } from '@utils';
import { GalleryBadge, ImageWithFallback, InternalLink } from '@components/atoms';
import { WhiteFeePaige } from '@components/molecules';

// import MoreIcon from '@assets/icons/black-more-icon.svg';
import styles from './style.module.scss';

interface IProps {
  user: IUser;
  isPublic?: boolean;
}

const MemberCard = ({ user, isPublic }: IProps) => {
  const {
    _id,
    login,
    header,
    full,
    role,
    fee,
    banner,
    avatar,
    gallery,
    artworks,
  } = useMemo(() => ({
    ...user,
  }), [user]);

  return (
    <div className={styles.root}>
      <InternalLink to={getProfilePublicRoute(_id, role.name)} className={styles.root__link}>
        <div className={styles.root_member}>
          <div className={styles.root_member__cover}>
            <ImageWithFallback src={banner} fallback="defaultBanner" />
          </div>
          <div className={styles.root_member__main}>
            <div className={styles.root_member__context}>
              <ImageWithFallback
                src={avatar}
                fallback="defaultAvatar"
                className={styles.root_member__avatar}
              />
              {/* <button className={styles.root_member__context_btn}> */}
              {/*   <img src={MoreIcon} alt="dots" /> */}
              {/* </button> */}
            </div>
            <div className={styles.root_member__info}>
              <div className={styles.root_member__info__inner}>
                <p className={styles.root_member__nickname}>@{header ?? login}</p>
                <p className={styles.root_member__name}>
                  {full}
                </p>
              </div>
              <div className={styles.root_gallery}>
                <div>
                  <p className={styles.root__text}>
                    Curated by
                  </p>
                  <GalleryBadge gallery={gallery} size="sm" />
                </div>
                <div className={styles.root_artworks__item}>
                  <p className={styles.root_artworks__number}>
                    {artworks ?? 0}
                  </p>
                  <p className={styles.root_artworks__text}>
                    Artworks
                  </p>
                </div>
              </div>
              {!isPublic && (
                <WhiteFeePaige fee={fee} />
              )}
            </div>
          </div>
        </div>
      </InternalLink>
    </div>
  );
};


export default MemberCard;
