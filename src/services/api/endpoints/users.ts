import axios from '../axios';

const endpoints = {
  getAll: (params?: {}) => axios.get(`/users${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  getOne: (id: string) => axios.get(`/user/${id}`),
  getMe: () => axios.get('/user/me'),
  getUserArt: (id: string, params?: {}) => axios.get(`/user/${id}/arts${params ? `?${new URLSearchParams(params).toString()}` : ''}`),
  getUserFavorites: (id: string) => axios.get(`/user/${id}/liked`),
  editMyAvatar: (data: unknown) => axios.post('/user/me/avatar', data),
  editMyBanner: (data: unknown) => axios.post('/user/me/banner', data),
  readPush: (data: unknown) => axios.post('/user/me/readPush', data),
  edit: (id: string, data: unknown) => axios.patch(`/user/${id}`, data),
  editMe: (data: unknown, token?: string) => axios.patch('/user/me', data, {
    ...(token && ({
      headers: {
        authorization: token,
      },
    })),
  }),
  remove: (id: string) => axios.delete(`/user/${id}`),
};

export default endpoints;
