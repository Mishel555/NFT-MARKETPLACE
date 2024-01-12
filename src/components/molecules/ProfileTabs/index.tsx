import { forwardRef } from 'react';
import classNames from 'classnames';
import { ILinkedTabs } from '@constants/types';
import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  tabs: ILinkedTabs[];
  current: string;
}

const ProfileTabs = forwardRef<HTMLAnchorElement, IProps>(({ tabs, current }, forwardedRef) => (
  <ul className={styles.root}>
    {tabs.map(({ label, to, counter }, index) => (
      <InternalLink
        key={index}
        to={to}
        ref={current === to ? forwardedRef : undefined}
        className={classNames(styles.root__item, current === to && styles.root__item_active)}
      >
        {label}
        {!!counter && (
          <div className={styles.root__item_counter}>
            {counter}
          </div>
        )}
      </InternalLink>
    ))}
  </ul>
));

export default ProfileTabs;
