import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { IArtAction, IMarketArt } from '@constants/types';
import { useAuth } from '@hooks';
import { getProfilePublicRoute } from '@utils';
import { ImageWithFallback, InternalLink } from '@components/atoms';
import Hero from './Hero';
import Info from './Info';
import LikersBox from './LikersBox';

import styles from './style.module.scss';

interface IProps {
  art: IMarketArt;
  actions?: IArtAction[];
  fromCarousel?: boolean;
  isUsd?: boolean;
  showStatus?: boolean;
}

const MarketCard = ({ art, actions, isUsd, fromCarousel, showStatus }: IProps) => {
  const { user: myUser } = useAuth();

  const { _id, likes, user, price, art: childArt } = art;
  const isGif = childArt.info.type === 'gif';

  const showPrice = useMemo(() => {
    const { auction } = childArt;

    if (auction && auction.prices) {
      if (auction.bids.length) {
        return auction.bids[auction.bids.length - 1].price;
      }

      return auction.prices.start;
    }

    return price;
  }, [price, childArt]);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const hover = (): void => setIsHovered(true);
  const leave = (): void => setIsHovered(false);

  return (
    <div
      onMouseEnter={hover}
      onMouseLeave={leave}
      className={classNames(styles.root, fromCarousel && styles.root_carousel)}
    >
      <div className={styles.root__creator}>
        <div className={styles.root__creator__info}>
          <ImageWithFallback src={user.avatar} className={styles.root__creator__avatar} fallback="defaultAvatar" />
          <InternalLink to={getProfilePublicRoute(user['_id'], user.role.name)} className={styles.root__creator__name}>
            @{user.header ?? user.login}
          </InternalLink>
        </div>
        <LikersBox artId={_id} myUser={myUser} likes={likes} iLiked={childArt.liked} />
      </div>
      <Hero
        id={_id}
        preview={isGif ? childArt.image : childArt.thumb}
        isHovered={isHovered}
        type={childArt.isImage ? 'image' : 'video'}
      />
      <Info
        art={childArt}
        price={showPrice}
        isUsd={isUsd}
        actions={actions}
        showStatus={showStatus}
      />
    </div>
  );
};

export default MarketCard;
