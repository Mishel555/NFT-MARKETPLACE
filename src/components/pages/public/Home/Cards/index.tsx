import { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import Paths from '@constants/paths';
import { InternalLink } from '@components/atoms';

import GalleriesBack from '@assets/images/home/explore-galleries.webp';
import DiscoverBack from '@assets/images/home/discover.webp';
import MemberBack from '@assets/images/home/become-member.webp';
import styles from './style.module.scss';
import classNames from 'classnames';

const DATA = [
  {
    label: 'explore galleries',
    link: Paths.GALLERIES,
    image: GalleriesBack,
  },
  {
    label: 'discover artworks',
    link: Paths.MARKETPLACE,
    image: DiscoverBack,
    autofocus: true,
  },
  {
    label: 'become member',
    link: Paths.MEMBERSHIP,
    image: MemberBack,
    disabled: false,
  },
];

const Cards = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMobile && mainRef.current) {
      mainRef.current.scrollIntoView({ inline: 'center' });
    }
  }, [isMobile]);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        {DATA.map(({
          image,
          label,
          link,
          autofocus,
          disabled,
        }, index) => (
          <div
            key={index}
            ref={autofocus ? mainRef : null}
            className={classNames(styles.root__item, disabled && styles.root__item_disabled)}
          >
            <img src={image} alt="explore" className={styles.root__image} />
            {disabled ? (
              <p className={styles.root__action}>{label}</p>
              ) : (
              <InternalLink to={link} className={styles.root__action}>{label}</InternalLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
