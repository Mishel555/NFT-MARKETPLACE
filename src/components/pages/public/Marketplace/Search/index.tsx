import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@hooks';

import SearchIcon from '@assets/icons/search-grey-icon.svg';
import styles from './style.module.scss';

interface IProps {
  setOption: (name: string, options: string | null) => void;
}

const Search = ({ setOption }: IProps) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  const [value, setValue] = useState<string>(search ?? '');

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setOption('search', debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (search !== value) {
      setValue(search || '');
    }
  }, [search]);

  return (
    <div className={styles.root}>
      <div className={styles.root_group}>
        <input
          className={styles.root_group__input}
          placeholder="Search by Art Name"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <img src={SearchIcon} className={styles.root_group__icon} alt="search" />
      </div>
    </div>
  );
};

export default Search;
