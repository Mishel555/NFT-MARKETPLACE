import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { AuthContext } from '@contexts/AuthContext';
import { IUser } from '@constants/types';
import api from '@services/api';

interface IProps {
  children?: ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const { address } = useAccount();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [token, setTokenData] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loginRedirect, setLoginRedirect] = useState<string | null>(null);

  const setToken = useCallback((tokenData: string | null, soft?: boolean) => {
    if (tokenData) {
      Cookies.set('auth-token', tokenData, { expires: 1 });
    } else {
      if (!soft) {
        Cookies.remove('auth-token');
      }
    }

    setTokenData(tokenData);
  }, []);

  const setUserInfo = useCallback((user: IUser) => {
    setUser(user);
  }, []);

  const setRedirectUrl = useCallback((url: string) => {
    setLoginRedirect(url);
  }, []);

  const loadData = useCallback(async () => {
    const tokenData = Cookies.get('auth-token');
    setTokenData(tokenData || null);

    try {
      if (tokenData) {
        const { data } = await api.users.getMe();
        const { wallet } = data;

        if (wallet !== address) {
          return setUser(null);
        }

        setUser(data);
      }
    } catch (e) {
      setToken(null);

      const error = e as AxiosError;
      if (error.response?.status === 401) {
        window.location.href = '/signIn';
      }
    } finally {
      setIsLoaded(true);
    }
  }, [address, setToken]);

  const logOut = useCallback(async (soft?: boolean) => {
    if (!soft) {
      Cookies.remove('auth-token');
    }

    setUser(null);
    setToken(null, soft);
    setLoginRedirect(null);
  }, [setToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!user) return;

    if (user.deletedAt || user.wallet !== address) {
      logOut(true);
      window.location.href = '/signIn';
    }
  }, [logOut, address, user]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
      token,
      loginRedirect,
      setUser: setUserInfo,
      setToken,
      logOut,
      setRedirectUrl,
    }),
    [isLoaded, user, loginRedirect, token, setToken, setUserInfo, logOut, setRedirectUrl],
  );

  return (
    // Providing data to our app
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
