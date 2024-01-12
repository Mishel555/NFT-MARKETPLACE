import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAccount } from 'wagmi';
import { AvailableNetworks, IBalances, IUser } from '@constants/types';
import { ZERO_ADDRESS } from '@constants/web3';
import { useAuth, useWeb3 } from '@hooks';
import api from '@services/api';

import Auctions from './Auctions';
// import Deposits from './Deposits';
import WalletSection from './WalletSection';
import FundGroup from './FundGroup';
import Loading from './Loading';

import styles from './style.module.scss';
import { objectEquals } from '@utils';

interface IProps {
  user: IUser;
}

const initialBalance = { ethereum: 0, polygon: 0 };

const Apps = ({}: IProps) => {
  const { send } = useWeb3();
  const { address } = useAccount();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [balance, setBalance] = useState<IBalances>(initialBalance);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const collect = async (blockchain: AvailableNetworks) => {
    try {
      if (!user || !balance) return;

      const amount = balance[blockchain];

      if (!amount) return toast.error('Insufficient funds');

      setIsLoading(true);

      await send('balanceDrop', { amount, blockchain });

      setBalance(prevState => ({
        ...prevState,
        [blockchain]: 0,
      }));

      setIsLoading(false);
      toast.success('Successfully collected');
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      setIsLoading(false);
      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      toast.error(error.response?.data.message || error.message || e);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const { data } = await api.users.getMe();
        const { wallet } = data as IUser;

        const balanceResponse = await send('balanceGet', {
          blockchain: 'ethereum', // wallet is not used in this method
          address: address || wallet || ZERO_ADDRESS,
        });

        if (mounted && !objectEquals(balance, balanceResponse)) {
          setBalance(balanceResponse);
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
  }, [navigate, address, send, balance]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <h2 className={styles.root__title}>
        Crypto wallet
      </h2>
      <div className={styles.root__container}>
        <WalletSection />
        <FundGroup title="Balance (Reserved funds, Profit, Fees)" balance={balance} onCollect={collect} />
      </div>
      {!!user && (
        <Fragment>
          {/* <Deposits /> */}
          <Auctions userId={user['_id']} />
        </Fragment>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default Apps;
