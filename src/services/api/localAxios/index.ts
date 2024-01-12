import axios from 'axios';
import Cookies from 'js-cookie';
import { LOCAL_API_ORIGIN } from '@constants/environment';

const axiosInstance = axios.create({
  baseURL: `${LOCAL_API_ORIGIN}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get('auth-token');

    if (authToken) {
      config.headers ??= {};
      config.headers.authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
