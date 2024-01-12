import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { AxiosError } from 'axios';
import { ALLOWED_CHAINS } from '@constants/web3';
import api from '@services/api';
import { switchChain } from '@utils';
import { useAuth } from '@hooks';
import { Metamask } from '@components/molecules';
import Header from '../Header';

import styles from './style.module.scss';

interface IProps {
  onChange: (wallet: string) => void;
}

const MetamaskForm = ({ onChange }: IProps) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const confirmWallet = async () => {
    try {
      if (!address || !chain) return;

      const { data } = await api.auth.getNonce({ wallet: address });

      if (data.userId) {
        toast.warning('You are already registered please Sign In');

        if (!ALLOWED_CHAINS.includes(chain.id)) {
          await switchChain('ethereum');
        }

        const message = new SiweMessage({
          nonce: data.nonce,
          chainId: ALLOWED_CHAINS[0],
          domain: window.location.host,
          address,
          statement: '',
          uri: window.location.origin,
          version: '1',
        }).prepareMessage();

        const signature = await signMessageAsync({ message });

        const { data: user } = await api.auth.login({ signature, message });
        setToken(user.accessToken);
        delete user.accessToken;
        setUser(user);

        return navigate(`/profile/${user['_id']}`);
      }

      onChange(address);
      navigate('/signUp/role');
    } catch (e) {
      const error = e as AxiosError;

      console.log(e);
      toast.error(error.response?.data.message || error.message || e);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.content_root}>
        <Header
          currentStep={1}
          stepLength={3}
          stepTitle="Choose crypto currency wallet"
        />
        <div className={styles.root__form}>
          <div className={styles.root__metamask}>
            <Metamask />
          </div>
          <div className={styles.root__form_wrap}>
            <button
              onClick={confirmWallet}
              disabled={!address}
              className={styles.root__form_wrap_btn}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetamaskForm;
