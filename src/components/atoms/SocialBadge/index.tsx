import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { copyToClipBoard } from '@utils';
import ExternalLink from '../ExternalLink';

import FacebookIcon from '@assets/icons/facebook-black-icon.svg';
import InstagramIcon from '@assets/icons/black-instagram-icon.svg';
import TwitterIcon from '@assets/icons/black-twitter-icon.svg';
import GlobeIcon from '@assets/icons/black-globe-icon.svg';
import ClipboardIcon from '@assets/icons/clipboard-black-icon.svg';
// import BadgeIcon from '@assets/icons/approved-icon.svg';
import styles from './style.module.scss';

const IMAGES: { [key: string]: string } = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  globe: GlobeIcon,
};

interface IProps {
  icon?: 'facebook' | 'instagram' | 'twitter';
  url: string;
  title: string;
  isVerified?: boolean;
}

const SocialBadge = ({
  icon,
  url,
  title,
}: IProps) => {
  const {
    memoizedTitle,
    memoizedImage,
  } = useMemo(() => {
    let src: string = IMAGES['globe'];
    let text: string = title;

    if (icon) {
      src = IMAGES[icon];
    }

    Object.keys(IMAGES).forEach((key) => {
      if (url.includes(key)) {
        src = IMAGES[key];
        text = key;
      }
    });

    return {
      memoizedTitle: text,
      memoizedImage: src,
    };
  }, [icon, title, url]);

  const copy = useCallback(async () => {
    try {
      await copyToClipBoard(url);
      toast.success('Copied to clipboard');
    } catch (e) {
      console.log(e);
      toast.error('Cannot copy to clipboard');
    }
  }, [url]);

  return (
    <div className={styles.root}>
      <img src={memoizedImage} className={styles.root__icon} alt="image" />
      <ExternalLink to={url} className={styles.root__name}>
        {memoizedTitle}
      </ExternalLink>
      <button type="button" onClick={copy} className={styles.root__copy}>
        <img src={ClipboardIcon} alt="clipboard" />
      </button>
    </div>
  );
};

export default SocialBadge;
