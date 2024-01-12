import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { InternalLink } from '@components/atoms';

import MoreIcon from '@assets/icons/black-more-icon.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

const ProfileActions = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const toggle = useCallback(() => setShowMenu(!showMenu), [showMenu]);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div className={styles.root}>
      <div ref={rootRef} className={styles.root__item}>
        <button className={styles.root__item_btn} onClick={toggle}>
          <img src={MoreIcon} alt="" />
        </button>
        {showMenu && (
          <ul className={classNames(styles.root__menu, animatedStyles.born_via_fade)}>
            <li className={styles.root__menu_item}>
              <InternalLink to="/settings/" className={styles.root__menu_item}>
                settings
              </InternalLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileActions;
