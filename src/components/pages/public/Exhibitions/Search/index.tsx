import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@hooks';

import SearchIcon from '@assets/icons/search-grey-icon.svg';
import DeleteIcon from '@assets/icons/delete-icon.svg';
import styles from './style.module.scss';

interface IProps {
  setOption: (name: string, options: string | null) => void;
}

const Search = ({ setOption }: IProps) => {
  const [searchParams, setSearchParam] = useSearchParams();
  const search = searchParams.get('search');

  const [value, setValue] = useState<string>(search ?? '');

  const debouncedValue = useDebounce(value, 500);

  const clear = () => setValue('');

  useEffect(() => {
    if(!searchParams.get('sort')){
      searchParams.set('sort', '-date');
      setSearchParam(searchParams.toString());
    }
  }, []);

  useEffect(() => {
    setOption('search', debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={styles.root}>
      <div className={styles.root_group}>
        <input
          className={styles.root_group__input}
          placeholder="Search"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        {value ? (
          <button type="button" onClick={clear} className={styles.root_group__icon}>
            <img src={DeleteIcon} alt="search" />
          </button>
        ) : (
          <button type="button" className={styles.root_group__icon}>
            <img src={SearchIcon} alt="search" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
