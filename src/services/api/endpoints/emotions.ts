import axios from '../axios';

const endpoints = {
  getAll: () => axios.get('/emotions'),
  getOne: (id: string) => axios.get(`emotion/${id}`),
  remove: (id: string) => axios.delete(`emotion/${id}`),
  edit: (id: string, data: unknown) => axios.patch(`emotion/${id}`, data),
  add: (data: unknown) => axios.post('/emotion', data),
};

export default endpoints;
