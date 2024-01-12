import { useMemo } from 'react';
import { IUser } from '@constants/types';
import { getProfilePublicRoute, getShortAddress } from '@utils';
import { ImageWithFallback, InternalLink, UserBadge, GalleryBadge, MembershipBadge } from '@components/atoms';

import EthIcon from '@assets/icons/eth-icon.svg';
// import MoreIcon from '@assets/icons/black-more-icon.svg';
import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

const MarketProfileCard = ({ user }: IProps) => {
  const {
    _id,
    login,
    header,
    role,
    wallet,
    avatar,
    banner,
    gallery,
    artists,
    artworks,
    hasPlatinumMembership,
    hasStandardMembership,
  } = useMemo(() => ({
    ...user,
    arts: user.copies?.length || 0,
  }), [user]);

  return (
    <InternalLink to={getProfilePublicRoute(_id, role.name)} className={styles.link}>
      <div className={styles.root}>
        <div className={styles.root__cover}>
          <ImageWithFallback src={banner} fallback="defaultBanner" />
        </div>
        <div className={styles.root__main}>
          <ImageWithFallback src={avatar} fallback="defaultAvatar" className={styles.root__avatar} />
          {/* <div className={styles.root__item__controller}> */}
          {/*   <button className={styles.root__btn}> */}
          {/*     <img src={MoreIcon} alt="" /> */}
          {/*   </button> */}
          {/* </div> */}
        </div>
        <div className={styles.root__info}>
          <div className={styles.root__wrapper}>
            <p className={styles.root__art}>
              {header ?? login}
            </p>
            {hasPlatinumMembership && (
              <MembershipBadge type={hasPlatinumMembership ? 'Platinum Membership' : 'Standard Membership'} />
            )}

            {!hasPlatinumMembership && hasStandardMembership && (
              <MembershipBadge type="Standard Membership" />
            )}
          </div>
          <div className={styles.root__group}>
            <UserBadge role={role.name ?? 'artist'} />
            {!!wallet && (
              <div className={styles.root__group__eth}>
                <img src={EthIcon} alt="" />
                {getShortAddress(wallet)}
              </div>
            )}
          </div>
          {!!gallery && (
            <div className={styles.root__GalleryBadge}>
              <div>
                <p className={styles.root__text}>
                  Curated by
                </p>
                <GalleryBadge gallery={gallery} size="sm" />
              </div>
              {role.name === 'artist' && (
                <div className={styles.root_artworks__item}>
                  <p className={styles.root_artworks__number}>
                    {artworks ?? 0}
                  </p>
                  <p className={styles.root_artworks__text}>
                    Artworks
                  </p>
                </div>
              )}
            </div>
          )}
          {role.name === 'gallery' && (
            <div className={styles.root_artworks}>
              <div className={styles.root_artworks__item}>
                <p className={styles.root_artworks__number}>
                  {artworks ?? 0}
                </p>
                <p className={styles.root_artworks__text}>
                  Artworks
                </p>
              </div>
              <div className={styles.root_artworks__item}>
                <p className={styles.root_artworks__number}>
                  {artists ?? 0}
                </p>
                <p className={styles.root_artworks__text}>
                  Artists
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </InternalLink>
  );
};

export default MarketProfileCard;
