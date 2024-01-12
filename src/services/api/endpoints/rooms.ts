import axios from '../axios';

const endpoints = {
  getAll: () => axios.get('/rooms'),
  getSingle: (id: string) => axios.get(`/room/${id}`),
  add: (data: unknown) => axios.post('/room', data),
  edit: (id: string, data: unknown) => axios.post(`/room/${id}`, data),
  remove: (id: string) => axios.delete(`/room/${id}`),
};

export default endpoints;
