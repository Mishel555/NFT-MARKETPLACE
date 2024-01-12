import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { AxiosError } from 'axios';
import PATHS from '@constants/paths';
import { ALLOWED_CHAINS } from '@constants/web3';
import api from '@services/api';
import { switchChain } from '@utils';
import { useAuth } from '@hooks';
import RoleSelector from './RoleSelector';
import InfoForm from './InfoForm';
import GallerySelector from './GallerySelector';
import MetaMask from './Metamask';

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramRole = searchParams.get('role');

  const { setToken, setUser } = useAuth();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { connectAsync, connectors } = useConnect();

  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [values, setValues] = useState<FieldValues | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const onWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
    sessionStorage.setItem('registerWallet', wallet);
  };

  const selectRole = (roleName: string | null) => {
    if (roleName === role) {
      setRole(null);
    } else {
      setRole(roleName);
    }
  };

  const registerUser = async (values: FieldValues) => {
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

      if (wallet !== selectedWallet) {
        return toast.error('Please select the wallet that was selected in the first step');
      }

      await api.auth.validateRegister({
        ...(values.login && ({ login: values.login })),
        ...(values.header && ({ header: values.header })),
        email: values.email,
      });

      if (!ALLOWED_CHAINS.includes(chainId)) {
        await switchChain('ethereum');
      }

      const { data: fields } = await api.auth.getNonce({ wallet });

      const message = new SiweMessage({
        nonce: fields.nonce,
        chainId: ALLOWED_CHAINS[0],
        domain: window.location.host,
        address: wallet,
        statement: '',
        uri: window.location.origin,
        version: '1',
      }).prepareMessage();

      const signature = await signMessageAsync({ message });

      const { data: user } = await api.auth.register({ message, signature, ...values });

      setUser(user);
      setToken(user.accessToken);

      sessionStorage.removeItem('registerWallet');

      if (values.role === 'user') {
        return navigate(`/profile/${user['_id']}`);
      }

      navigate(`${PATHS.CONFIRM}?type=waitAdmin`);
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.response?.data.message || error.message || e);
    }
  };

  const confirmRole = () => {
    navigate(`info?role=${role}`);
  };

  const confirmInfo = (values: FieldValues) => {
    if (role === 'artist') {
      setValues(values);
      return navigate('gallery');
    }

    registerUser(values);
  };

  useEffect(() => {
    const wallet = sessionStorage.getItem('registerWallet');

    if (wallet) {
      setSelectedWallet(wallet);
    }
  }, []);

  useEffect(() => {
    if (paramRole) {
      setRole(paramRole);
    }
  }, [paramRole]);

  return (
    <Routes>
      <Route path={PATHS.SIGN_UPS.DEFAULT} element={<MetaMask onChange={onWalletSelect} />} />
      <Route
        path={PATHS.SIGN_UPS.ROLE}
        element={<RoleSelector selectedRole={role} selectRole={selectRole} confirm={confirmRole} />}
      />
      <Route
        path={PATHS.SIGN_UPS.INFO}
        element={<InfoForm role={role ?? ''} confirm={confirmInfo} />}
      />
      <Route
        path={PATHS.SIGN_UPS.GALLERY}
        element={<GallerySelector confirm={(data: FieldValues) => registerUser({ ...values, ...data })} />}
      />
      <Route path={PATHS.UNKNOWN} element={<Navigate to="/not-found-404" />} />
    </Routes>
  );
};

export default SignUp;
