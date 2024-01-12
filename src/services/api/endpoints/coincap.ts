import axios from 'axios';
import { COINCAP_API_ORIGIN } from '@constants/environment';

const endpoints = {
  getRates: () => axios.get(`${COINCAP_API_ORIGIN}/assets`),
};

export default endpoints;
