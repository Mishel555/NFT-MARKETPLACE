import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useDebounce } from '@hooks';
import Group from '../Group';
import GroupSearch from '../GroupSearch';

import styles from './style.module.scss';

interface IOption {
  _id: string;
  name: string;
  login: string;
  count?: number;
}

interface IProps {
  name: string;
  options: IOption[];
  setOption: (name: string, options: string | null) => void;
}

const CheckboxGroup = ({
  name,
  options,
  setOption,
}: IProps) => {
  const memoizedOptions = useMemo(() => options, [options]);

  const urlName = name.replaceAll(' ', '');
  const [searchParams] = useSearchParams();
  const urlParams = searchParams.get(urlName)?.split(',') || [];

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filters, setFilters] = useState<string[]>(urlParams);
  const [showOptions, setShowOptions] = useState<IOption[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const clearFilter = useCallback(() => {
    if (filters.length) {
      setFilters([]);
    }

    if (searchValue.length) {
      if (inputRef.current) {
        inputRef.current.value = '';
      }

      setSearchValue('');
    }
  }, [filters, showOptions]);

  const debounceSearchValue = useDebounce(searchValue, 500);

  const onInput = (value: string): void => {
    setSearchValue(value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setFilters(prevState => [...prevState, e.target.name]);
    } else {
      const temp = filters.filter(filter => filter !== e.target.name);

      setFilters(temp);
    }
  };

  useEffect(() => {
    if (debounceSearchValue) {
      const search = new RegExp(debounceSearchValue.toLowerCase());

      setShowOptions(options.filter(({
          login,
          name,
        }) => login ? search.test(login.toLowerCase()) : search.test(name.toLowerCase()),
      ));
    } else {
      setShowOptions(options);
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    if (filters.length) {
      setOption(urlName, filters.join(','));
    } else {
      setOption(urlName, null);
    }
  }, [filters]);

  useEffect(() => {
    setShowOptions(memoizedOptions);
  }, [memoizedOptions])

  return (
    <Group name={name}>
      <div className={styles.root}>
        <GroupSearch ref={inputRef} onInput={onInput} defaultValue={debounceSearchValue} />
        <ul className={styles.root__group}>
          {showOptions.map(({
            _id,
            login,
            name,
            count,
          }) => (
            <li key={_id} className={styles.root__option}>
              <div>
                <input
                  key={filters.length}
                  id={_id}
                  type="checkbox"
                  defaultChecked={filters.includes(_id)}
                  onChange={onChange}
                  name={_id}
                />
                <label htmlFor={_id}>{login ?? name}</label>
              </div>
              <p
                className={classNames(
                  styles.root__option__number,
                  filters.includes(_id) && styles.root__option__number_active
                )}
              >
                {count !== undefined && count}
              </p>
            </li>
          ))}
        </ul>
        <button className={styles.root__clear} onClick={clearFilter}>
          Clear All
        </button>
      </div>
    </Group>
  );
};

export default CheckboxGroup;
