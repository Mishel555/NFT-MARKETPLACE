import axios from '../axios';

const endpoints = {
  subscribe: (data: unknown) => axios.post('/subscribe', data),
};

export default endpoints;
