import { createContext } from 'react';
import { IAuthContext } from '@constants/types';

// creating AUTH context/data for app
export const AuthContext = createContext<IAuthContext>({
  isLoaded: false,
  user: null,
  loginRedirect: null,
  token: null,
  setUser: () => {},
  setRedirectUrl: () => {},
  setToken: () => {},
  logOut: () => {},
});
