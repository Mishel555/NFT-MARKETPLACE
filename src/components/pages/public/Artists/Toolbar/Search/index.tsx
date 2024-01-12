import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@hooks';

import SearchIcon from '@assets/icons/search-grey-icon.svg';
import styles from './style.module.scss';

interface IProps {
  afterChange: (value: string) => void;
}

const Search = ({ afterChange }: IProps) => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedValue = useDebounce(value, 200);

  useEffect(() => {
    afterChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={styles.root}>
      <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      />
      <img src={SearchIcon} alt="search" />
    </div>
  );
};

export default Search;
