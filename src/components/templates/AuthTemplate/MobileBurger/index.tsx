import { useCallback, useState } from 'react';
import { SECOND_URL } from '@constants/environment';
import { BurgerIcon, CloseIcon } from '@components/icons';
import { ExternalLink, InternalLink } from '@components/atoms';

import styles from './style.module.scss';

const paths = [
  {
    to: '/',
    label: 'Marketplace',
  },
  {
    to: SECOND_URL || 'artinspacegallery.art',
    label: 'About art in space',
    external: true,
  },
];

const MobileBurger = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const open = useCallback(() => setIsShow(true), []);
  const close = useCallback(() => setIsShow(false), []);

  return (
    <div className={styles.root}>
      <button onClick={open} className={styles.root__btn}>
        <BurgerIcon width={35} height={35} />
      </button>
      {isShow && (
        <ul className={styles.root__wrapper}>
          {paths.map(({
            to,
            label,
            external,
          }, index) => external ? (
            <ExternalLink key={index} to={to} noBlank className={styles.root__wrapper_item}>{label}</ExternalLink>
          ) : (
            <InternalLink key={index} to={to} className={styles.root__wrapper_item}>{label}</InternalLink>
          ))}
          <button onClick={close} className={styles.root__wrapper_close}>
            <CloseIcon width={35} height={35} fill="#000" />
          </button>
        </ul>
      )}
    </div>
  );
};

export default MobileBurger;
