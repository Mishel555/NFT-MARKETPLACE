import axios from '../axios';

const endpoints = {
  getPurchases: (params?: {}) =>
    axios.get(`/purchases/arts${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  getStats: (params?: {}) =>
    axios.get(`/purchases/stats${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  getSalesChart: (params?: {}) =>
    axios.get(`/purchases/chart${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  getCSV: (url: string) => axios.get(url.includes('?') ? `${url}&csv=true` : `${url}?csv=true`),
};

export default endpoints;
