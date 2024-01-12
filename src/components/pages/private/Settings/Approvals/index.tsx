import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import moment from 'moment';
import { IRequest, IUser, RequestStatusType } from '@constants/types';
import api from '@services/api';
import { FilterTabs, RequestItem } from '@components/organisms';

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
  'rejectedByAdminAt',
  'rejectedByGalleryAt',
  'approvedByGalleryAt',
  'acceptedOfferAt',
  'declinedOfferAt',
];

const Approvals = ({}: IProps) => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<RequestStatusType>('inReviewByAdmin');
  const [requests, setRequests] = useState<IRequestsState | null>(null);

  const changeFilter = (filter: string) => setFilter(filter as RequestStatusType);

  const getRequests = useCallback(async () => {
    try {
      const { data } = await api.requests.getAll({ only: filter });

      const map = new Map();
      const requests: IRequest[] = (data as IRequest[]).sort(({ createdAt: a }, { createdAt: b }) => (
        +moment(b).format('x') - +moment(a).format('x')
      ));

      requests?.forEach(({
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
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [navigate, filter]);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <FilterTabs filters={FILTERS} currentFilter={filter} setFilter={changeFilter} />
      <div>
        {!!requests && Object.entries(requests)?.map(([date, request], index) => (
          <div key={index} className={styles.root__item}>
            <p className={styles.root__date}>
              {date}
            </p>
            <div key={request.length}>
              {request?.map((request, index) => (
                <RequestItem key={index} requestInfo={request} defaultFilter={filter} load={getRequests} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approvals;
