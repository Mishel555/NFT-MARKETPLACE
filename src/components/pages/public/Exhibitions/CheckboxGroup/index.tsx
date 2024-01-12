import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@hooks';
import Group from '../Group';
import GroupSearch from '../GroupSearch';

import styles from './style.module.scss';

interface IOption {
  _id: string;
  login: string;
  header: string;
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
  const [showOptions, setShowOptions] = useState<IOption[]>(memoizedOptions || []);
  const [searchValue, setSearchValue] = useState<string>('');

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
        header,
        login,
        }) => header ? search.test(header.toLowerCase()) : search.test(login.toLowerCase()),
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
  }, [memoizedOptions]);

  return (
    <Group name={name}>
      <div className={styles.root}>
        <GroupSearch ref={inputRef} onInput={onInput} defaultValue={debounceSearchValue} />
        <ul className={styles.root__group}>
          {showOptions.map(({
            _id,
            header,
            login,
          }) => (
            <li key={_id} className={styles.root__option}>
              <input
                key={filters.length}
                id={_id}
                type="checkbox"
                defaultChecked={filters.includes(_id)}
                onChange={onChange}
                name={_id}
              />
              <label htmlFor={_id}>{header ?? login}</label>
            </li>
          ))}
        </ul>
      </div>
    </Group>
  );
};

export default CheckboxGroup;
