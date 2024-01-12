import { forwardRef } from 'react';

import SearchIcon from '@assets/icons/search-grey-icon.svg';
import styles from './style.module.scss';

interface IProps {
  onInput: (value: string) => void;
  defaultValue?: string;
}

const GroupSearch = forwardRef<HTMLInputElement, IProps>(({
  defaultValue,
  onInput,
}, forwardedRef) => (
  <div className={styles.root}>
    <input
      ref={forwardedRef}
      className={styles.root__input}
      placeholder="Search"
      onChange={(e) => onInput(e.target.value)}
      defaultValue={defaultValue}
    />
    <img src={SearchIcon} alt="search" />
  </div>
));

export default GroupSearch;
