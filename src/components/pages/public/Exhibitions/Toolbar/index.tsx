import { useCallback } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { getDynamicQuery } from '@utils';
import { ShowRoomFilters } from '@components/molecules';
import Sort from '../Sort';

import styles from './style.module.scss';

interface IProps {
}

const AVAILABLE_FILTERS = [
  'all',
  'previous',
  'new',
];

const SORT_OPTIONS = [
  {
    label: 'Newest',
    value: '-date'
  },
  {
    label: 'Oldest',
    value: 'date'
  },
];

const Toolbar = ({}: IProps) => {
  const [search, setSearch] = useSearchParams();
  const filter = search.get('filter');

  const setQuery = useCallback((name: string, options: string | null) => {
    const query = getDynamicQuery();

    const temp = {
      ...(query),
    };

    if (options && options.length && options !== 'null') {
      temp[name] = options;
    } else {
      if (temp.hasOwnProperty(name)) {
        delete temp[name];
      }
    }

    setSearch(temp as URLSearchParamsInit, {
      replace: true,
    });
  }, [setSearch]);

  const setFilter = useCallback((filter: string): void => {
    setQuery('filter', filter);
  }, [setQuery]);

  return (
    <div className={styles.root}>
      <ShowRoomFilters
        filters={AVAILABLE_FILTERS}
        currentFilter={filter || AVAILABLE_FILTERS[0]}
        changeFilter={setFilter}
      />
      <Sort name="sort" params={SORT_OPTIONS} />
    </div>
  );
};

export default Toolbar;
