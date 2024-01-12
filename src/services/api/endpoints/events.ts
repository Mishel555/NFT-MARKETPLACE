import axios from '../axios';

const endpoints = {
  getAll: (params?: {}) => axios.get(`/events${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  getSingle: (id: string) => axios.get(`/event/${id}`),
  getUserEvents: (id: string, params?: {}) =>
    axios.get(`/user/${id}/events${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  add: (data: unknown) => axios.post('/event', data),
  edit: (id: string, data: unknown) => axios.patch(`/event/${id}`, data),
  delete: (id: string) => axios.delete(`/event/${id}`),
};

export default endpoints;
