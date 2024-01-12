import { useCallback, useEffect, useState } from 'react';
import { URLSearchParamsInit, useNavigate, useSearchParams } from 'react-router-dom';
import { getDynamicQuery } from '@utils';
import { IExhibition, IUser } from '@constants/types';
import api from '@services/api';
import { useAuth } from '@hooks';
import { ExhibitionItem } from '@components/organisms';
import { ShowRoomFilters } from '@components/molecules';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
  isPrivate?: boolean;
}

interface IParams {
  perPage: number;
  page: number;
  filter?: string;
  future?: boolean;
  past?: boolean;
}

const FILTERS: string[] = [
  'all',
  'previous',
  'new',
];

const Exhibitions = ({ user }: IProps) => {
  const navigate = useNavigate();
  const { user: loggedUser } = useAuth();
  const [search, setSearch] = useSearchParams();
  const filter = search.get('filter') || FILTERS[0];

  const [exhibitions, setExhibitions] = useState<IExhibition[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

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

  const addNew = () => {
    navigate('/settings/exhibitions');
  };

  const loadExhibitions = useCallback(async () => {
    try {
      const params: IParams = {
        ...Object.fromEntries(search.entries()),
        perPage: 10,
        page: currentPage,
      };

      if (params.filter) {
        if (params.filter === 'new') {
          params.future = true;
        }

        if (params.filter === 'previous') {
          params.past = true;
        }

        delete params.filter;
      }

      const {
        data: {
          events,
          hasNextPage,
        },
      } = await api.events.getUserEvents(user['_id'], params);


      if (currentPage > 1) {
        setExhibitions(prevState => [...prevState, ...events]);
      } else {
        setExhibitions(events);
      }

      setHasNextPage(hasNextPage);
    } catch (e) {
      console.log(e);
    }
  }, [search, currentPage, user]);

  const loadMore = useCallback(() => {
    setCurrentPage(prevState => prevState + 1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    loadExhibitions();
  }, [loadExhibitions]);

  return (
    <div className={styles.root}>
      <div>
        <ShowRoomFilters filters={FILTERS} currentFilter={filter} changeFilter={setFilter} />
      </div>
      {loggedUser && loggedUser.role.name !== 'user' && loggedUser['_id'] === user['_id'] && (
        <button onClick={addNew} className={styles.root__new}>
          Add new
        </button>
      )}
      <div className={styles.root__wrapper}>
        {exhibitions.map((data) => (
          <ExhibitionItem key={data['_id']} data={data} />
        ))}
      </div>
      {hasNextPage && (
        <button onClick={loadMore} className={styles.root__more}>
          load more
        </button>
      )}
    </div>
  );
};

export default Exhibitions;
