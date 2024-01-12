import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import moment from 'moment';
import { ITransactionStats } from '@constants/types';
import api from '@services/api';
import { useAuth } from '@hooks';
import TransactionItem from '../TransactionItem';
import EmptyMessage from '../EmptyMessage';
import Loading from '../Loading';

import styles from './style.module.scss';

interface IProps {
  setCSVUrl: (url: string) => void;
}

const startDate = '01-01-2022';
const today = moment().format('MM-DD-YYYY');
const TransactionTable = ({ setCSVUrl }: IProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransactionStats[] | null>(null);

  const loadTransactions = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      setIsLoaded(false);
      const {
        data,
        request,
      } = await api.stats.getPurchases({
        from: startDate,
        to: today,
        user: user['_id'],
      });

      setCSVUrl(request.responseURL);
      setIsLoaded(true);
      setTransactions(data);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
      console.log(e);
    }
  }, [setCSVUrl, user, navigate]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        {!isLoaded && <Loading />}

        {isLoaded && !!transactions?.length ?
          transactions.map((transaction, index) => <TransactionItem key={index} data={transaction} />)
          : <EmptyMessage dataName="transactions" />}
      </div>
    </div>
  );
};

export default TransactionTable;
