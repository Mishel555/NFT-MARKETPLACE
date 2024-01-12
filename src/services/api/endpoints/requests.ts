import axios from '../axios';
import { IFee } from '@constants/types';

const endpoints = {
  getAll: (params?: {}) => axios.get(`/requests${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  getArtistRequests: (gallery: string, filter?: string) =>
    axios.get(`/requests?type=artist&gallery=${gallery}${filter ? `&only=${filter}` : ''}`),
  getRequest: (id: string) => axios.get(`/request/${id}`),
  approve: (id: string, fee?: IFee) => axios.post(`/request/${id}`, {
    approve: true,
    ...(!!fee && { fee }),
  }),
  reject: (id: string, reason?: string) => axios.post(`/request/${id}`, {
    approve: false,
    ...(!!reason && { reason }),
  }),
};

export default endpoints;
