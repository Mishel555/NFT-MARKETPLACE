import axios from '../axios';

const endpoints = {
  getAll: () => axios.get('/types'),
  getOne: (id:string) => axios.get(`type/${id}`),
  remove: (id:string) => axios.delete(`type/${id}`),
  edit: (id:string, data: unknown) => axios.patch(`type/${id}`, data),
  add: (data: unknown) => axios.post('type', data),
};

export default endpoints;
