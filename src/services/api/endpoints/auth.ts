import axios from '../axios';

const endpoints = {
  login: (data: unknown) => axios.post('/auth/login', data),
  register: (data: unknown) => axios.post('/auth/register', data),
  validateRegister: (data: unknown) => axios.post('/auth/validate', data),
  getNonce: (data: unknown) => axios.post('/auth/nonce', data),
};

export default endpoints;
