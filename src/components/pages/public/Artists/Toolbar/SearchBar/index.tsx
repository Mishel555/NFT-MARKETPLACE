import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDynamicQuery } from '@utils';
import { useDebounce } from '@hooks';

import DeleteIcon from '@assets/icons/delete-icon.svg';
import SearchIcon from '@assets/icons/search-grey-icon.svg';
import styles from './style.module.scss';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string | null>(searchParams.get('search'));
  const debouncedValue = useDebounce(value, 500);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);

  const clear = useCallback(() => setValue(null), []);

  useEffect(() => {
    const query = getDynamicQuery();

    const temp = {
      ...(query),
      ...(debouncedValue && { search: debouncedValue }),
    };

    if (!debouncedValue) {
      delete temp.search;
    }

    setSearchParams(temp, { replace: true });
  }, [debouncedValue, setSearchParams]);

  useEffect(() => {
    const searchValue = searchParams.get('search');

    if (searchValue !== value) {
      setValue(searchValue);
    }
  }, [searchParams]);

  return (
    <div className={styles.root}>
      <input
        type="text"
        placeholder="Search"
        value={value ?? ''}
        onChange={onChange}
        className={styles.root__input}
      />
      {value ? (
        <button onClick={clear} className={styles.root__icon}>
          <img src={DeleteIcon} alt="" />
        </button>
      ) : (
        <button className={styles.root__icon}>
          <img src={SearchIcon} alt="" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
