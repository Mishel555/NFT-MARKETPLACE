import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IUserDeposit } from '@constants/types';
import { getBlockchainCurrency } from '@utils';
import api from '@services/api';
import { InternalLink } from '@components/atoms';

import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

const Deposits = () => {
  const navigate = useNavigate();

  const [deposits, setDeposits] = useState<IUserDeposit[] | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const { data } = await api.users.getMe();

        if (data.deposits && mounted) {
          setDeposits(data.deposits);
        }
      } catch (e) {
        const error = e as AxiosError;
        console.log(e);

        toast.error(error.response?.data.message || error.message || e);

        if (error.response?.status === 401) {
          navigate('/signIn');
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return deposits?.length ? (
    <div className={styles.root}>
      <div className={styles.root__table}>
        <div className={styles.root__head}>
          <p className={styles.root__label}>Bids</p>
          <p className={styles.root__label}>Amount</p>
        </div>
        {deposits.map(({ amount, art }, index) => (
          <div key={art['_id']} className={styles.root__item}>
            <InternalLink to={`/art/${art['_id']}`} className={styles.root__label}>
              {index}. {art.title}
            </InternalLink>
            <p className={styles.root__label}>
              {art.blockchain === 'ethereum' ? (
                <img src={BlackEthIcon} alt="crypto" />
              ) : (
                <img src={PolygonIcon} alt="crypto" />
              )}
              {amount} {getBlockchainCurrency(art.blockchain)}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default Deposits;
