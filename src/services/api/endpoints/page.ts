import axios from '../axios';

const endpoints = {
  getAll: () => axios.get('/pages'),
  getPage: (page: string) => axios.get(`/page/${page}`),
  add: (data: unknown) => axios.post('/page', data),
  edit: (page: string, data: unknown) => axios.patch(`/page/${page}`, data),
  remove: (page: string) => axios.delete(`/page/${page}`),
};

export default endpoints;
