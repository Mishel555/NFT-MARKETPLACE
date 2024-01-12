import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { ALLOWED_CHAINS } from '@constants/web3';
import { useAuth } from '@hooks';
import { isMetaMaskInstalled, switchChain } from '@utils';
import api from '@services/api';
import MetamaskAlert from './MetaskAlert';

import MetamaskIcon from '@assets/icons/metamask-icon.png';
import styles from './style.module.scss';

interface IProps {
  label?: string;
  className?: string;
}

const LoginWithMetamask = ({ label = 'Sign In with metamask', className }: IProps) => {
  const navigate = useNavigate();
  const { setToken, setUser, loginRedirect } = useAuth();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { connectAsync, connectors } = useConnect();

  const signIn = async () => {
    try {
      let wallet = address;
      let chainId = chain?.id;

      if (!isConnected) {
        const { account, chain } = await connectAsync({ connector: connectors[0] });
        wallet = account;
        chainId = chain.id;
      }

      if (!wallet || chainId === undefined) {
        return toast.error('Wallet is not available');
      }

      if (!ALLOWED_CHAINS.includes(chainId)) {
        await switchChain('ethereum');
      }

      const accessToken = Cookies.get('auth-token');
      if (accessToken) {
        const { data: user } = await api.users.getMe();

        if (user.wallet === wallet) {
          if (loginRedirect) {
            navigate(loginRedirect);
          }

          return setUser(user);
        }
      }

      const { data } = await api.auth.getNonce({ wallet });

      if (!data.userId) {
        toast.warning('Your wallet is not registered. Please Sign Up.');
        return navigate('/signUp');
      }

      const message = new SiweMessage({
        nonce: data.nonce,
        chainId: ALLOWED_CHAINS[0],
        domain: window.location.host,
        address: wallet,
        statement: '',
        uri: window.location.origin,
        version: '1',
      }).prepareMessage();

      const signature = await signMessageAsync({ message });

      const { data: user } = await api.auth.login({ signature, message });
      setToken(user.accessToken);
      delete user.accessToken;

      setUser(user);

      if (loginRedirect) {
        navigate(loginRedirect);
      }
    } catch (e) {
      const error = e as AxiosError;

      console.log(e);
      toast.error(error.response?.data.message || error.message || e);
    }
  };

  return (
    <div className={classNames(styles.root, className)}>
      {isMetaMaskInstalled() ? (
        <button className={styles.root__btn} onClick={signIn}>
          <img src={MetamaskIcon} alt="" />
          {label}
        </button>
      ) : (
        <MetamaskAlert />
      )}
    </div>
  );
};

export default LoginWithMetamask;
