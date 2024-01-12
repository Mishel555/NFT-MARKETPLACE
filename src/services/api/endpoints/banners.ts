import axios from '../axios';

const endpoints = {
  getAll: () => axios.get('/banners'),
  getOne: (id: string) => axios.get(`/banner/${id}`),
  add: (data: unknown) => axios.post('/banner', data),
  edit: (id: string, data: unknown) => axios.post(`/banner/${id}`, data),
  delete: (id: string) => axios.delete(`/banner/${id}`),
};

export default endpoints;
