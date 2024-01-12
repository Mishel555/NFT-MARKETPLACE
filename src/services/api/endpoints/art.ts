import { AxiosRequestConfig } from 'axios';
import axios from '../axios';
import localAxios from '../localAxios';

const endpoints = {
  getAll: (params?: {}) => axios.get(`/arts${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  getSingle: (id: string) => axios.get(`/art/${id}`),
  getLikers: (id: string) => axios.get(`/art/${id}/liked`),
  getHQUrl: (id: string) => axios.get(`/art/${id}/url`),
  getArtsOfMembers: (galleryId: string, params?: {}) => axios.get(
    `/arts?gallery=${galleryId}&${params ? `${new URLSearchParams(params).toString()}` : ''}`,
  ),
  sendToDraft: (id: string) => axios.post(`/art/${id}/restore`),
  uploadVideo: (data: unknown, config?: AxiosRequestConfig) => axios.post('/art/upload/video', data, config),
  uploadNftImage: (data: unknown, config: AxiosRequestConfig) => axios.post('/art/upload/image', data, config),
  uploadImage: (data: unknown) => axios.post('/art/upload/image', data),
  sendToApprove: (id: string) => axios.post(`/art/${id}/send`),
  publish: (id: string, data: unknown) => axios.post(`/art/${id}/publish`, data),
  resell: (id: string, data: unknown) => axios.post(`/art/${id}/resell`, data),
  reviewCollaboration: (id: string, agree: boolean, message?: string) => axios.post(`/art/${id}/review`, { agree, feedback: message }),
  approveArt: (id: string) => axios.post(`/art/${id}/approve`),
  rejectArt: (id: string, data: unknown) => axios.post(`/art/${id}/reject`, data),
  like: (id: string) => axios.post(`/art/${id}/like`),
  mint: (id: string, data: unknown) => axios.post(`/art/${id}/minted`, data),
  buy: (id: string, data: unknown) => axios.post(`/art/${id}/own`, data),
  buyNow: (id: string, data: unknown) => axios.post(`/art/${id}/buyNow`, data),
  buyViaStripe: (id: string, data: unknown) => axios.post(`/art/${id}/buy`, data),
  bid: (id: string, data: unknown) => axios.post(`/art/${id}/bid`, data),
  fork: (id: string, data: unknown) => axios.post(`/art/${id}/fork`, data),
  reserve: (id: string) => axios.post(`/art/${id}/reserve`),
  closeAuction: (id: string, data: unknown) => axios.delete(`/art/${id}/auction`, { data }),
  submit: (id: string, data: unknown) => axios.put(`/art/${id}`, data),
  edit: (id: string, data: unknown) => axios.patch(`/art/${id}`, data),
  delete: (id: string) => axios.delete(`/art/${id}`),
  openFile: (data: unknown, token: string) => localAxios.post(`/video/upload?token=${token}`, data),
};

export default endpoints;
