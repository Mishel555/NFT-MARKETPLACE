import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import moment from 'moment';
import api from '@services/api';
import { IRequest, IUser, RequestStatusType } from '@constants/types';
import { RequestItem, FilterTabs } from '@components/organisms';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

interface IRequestsState {
  [key: string]: IRequest[];
}

const FILTERS: RequestStatusType[] = [
  'inReviewByAdmin',
  'approvedByAdminAt',
  'rejectedByGalleryAt',
  'approvedByGalleryAt',
  'acceptedOfferAt',
  'declinedOfferAt',
];

const Requests = ({ user }: IProps) => {
  const [search, setSearch] = useSearchParams();
  const filter = search.get('filter') as RequestStatusType;

  const navigate = useNavigate();

  const [requests, setRequests] = useState<IRequestsState | null>(null);

  const setFilter = useCallback((filter: string): void => {
    setSearch({ filter });
  }, [setSearch]);

  const loadRequests = useCallback(async () => {
    try {
      if (user) {
        const { data } = await api.requests.getArtistRequests(user['_id'], filter ? filter : 'approvedByAdminAt');

        const map = new Map();
        const requests: IRequest[] = (data as IRequest[]).sort(({ createdAt: a }, { createdAt: b }) => (
          +moment(b).format('x') - +moment(a).format('x')
        ));

        requests?.map(({
          createdAt,
          ...data
        }) => {
          const currentData: string = moment(createdAt).format('DD/MM/YYYY');

          if (map.has(currentData)) {
            map.set(currentData, [...map.get(currentData), {
              ...data,
              createdAt,
            }]);
          } else {
            map.set(currentData, [{
              ...data,
              createdAt,
            }]);
          }
        });

        setRequests({ ...Object.fromEntries(map) });
      }
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  }, [user, filter, navigate]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    if (!filter) {
      setFilter(FILTERS[1]);
    }
  }, [filter, setFilter]);

  return (
    <div className={styles.requests}>
      <div className={styles.requests__filters}>
        <FilterTabs filters={FILTERS} currentFilter={filter} setFilter={setFilter} />
      </div>
      <div className={styles.requests_block}>
        {!!requests && Object.entries(requests)?.map(([date, request], index) => (
          <div key={index}>
            <p className={styles.requests__date}>
              {date}
            </p>
            <div key={request.length} className={styles.requests_list}>
              {request?.map((request, index) => (
                <RequestItem
                  key={index}
                  requestInfo={request}
                  defaultFilter={filter || 'approvedByAdminAt'}
                  load={loadRequests}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
