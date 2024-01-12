import axios from 'axios';
import { COINBASE_API_ORIGIN } from '@constants/environment';

const endpoints = {
  getRateByName: (rate: string) => axios.get(`${COINBASE_API_ORIGIN}/prices/${rate}/spot`),
};

export default endpoints;
