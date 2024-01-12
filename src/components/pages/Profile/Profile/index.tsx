import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { AxiosError } from 'axios';
import web3 from '@services/web3';
import { AvailableNetworks, IUser } from '@constants/types';
import { METAMASK_DEEP_LINK } from '@constants/environment';
import { ZERO_ADDRESS } from '@constants/web3';
import { useAuth, useWeb3 } from '@hooks';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
  isPublic?: boolean;
}

const Info = ({ user }: IProps) => {
  const { send } = useWeb3();
  const { address } = useAccount();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user: loggedUser } = useAuth();

  const { about, manifesto, role } = useMemo(() => user, [user]);

  const drop = useCallback(async (amount: number, blockchain: AvailableNetworks) => {
    try {
      if (!loggedUser) return;

      await send('balanceDrop', { amount, blockchain }, {
        redirectUrl: `${METAMASK_DEEP_LINK}?action=drop&amount=${amount}&blockchain=${blockchain}`,
      });

      toast.success('Success');
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;

      toast.error(error.message ? error.message : e as string);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    } finally {
      setSearchParams({});
    }
  }, [loggedUser, navigate, send, setSearchParams]);

  useEffect(() => {
    if (!loggedUser || loggedUser['_id'] !== user['_id'] || loggedUser.role.name === 'admin') return;

    const detectAction = async () => {
      try {
        const action = searchParams.get('action');
        const blockchain = searchParams.get('blockchain') as AvailableNetworks;

        if (!action || !blockchain) return;

        if (action === 'drop') {
          const wallet = address || loggedUser.wallet || ZERO_ADDRESS;
          const balance = await web3.balance.balanceGet({
            blockchain,
            address: wallet,
          });
          const dropAmount = balance[blockchain];

          await drop(dropAmount, blockchain);
        }
      } catch (e) {
        const error = e as AxiosError;
        console.log(e);
        toast.error(error.response?.data.message || error.message || e);
      }
    };

    detectAction();
  }, [user, loggedUser, searchParams, drop, address]);

  return (
    <div className={styles.root}>
      <div className={styles.root__public}>
        {((role.name === 'artist' && !!manifesto) || (role.name === 'gallery' && !!about)) && (
          <div className={styles.root__public_item}>
            <h2 className={styles.root__public_title}>
              {(() => {
                switch (role.name) {
                  case 'gallery':
                    return 'About Us';
                  case 'artist':
                    return 'Artistic Manifesto';
                }
              })()}
            </h2>
            <p className={styles.root__public_description}>
              {(() => {
                switch (role.name) {
                  case 'gallery':
                    return about;
                  case 'artist':
                    return manifesto;
                }
              })()}
            </p>
          </div>
        )}
        {((role.name === 'artist' && !!about) || (role.name === 'gallery' && !!manifesto)) && (
          <div className={styles.root__public_item}>
            <h2 className={styles.root__public_title}>
              {(() => {
                switch (role.name) {
                  case 'gallery':
                    return 'Manifesto';
                  case 'artist':
                    return 'Artist Biography';
                }
              })()}
            </h2>
            <p className={styles.root__public_description}>
              {(() => {
                switch (role.name) {
                  case 'gallery':
                    return manifesto;
                  case 'artist':
                    return about;
                }
              })()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
