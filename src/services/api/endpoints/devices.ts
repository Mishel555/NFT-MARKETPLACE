import localAxios from '../localAxios';

const endpoints = {
  checkRoom: () => localAxios.get('/status'),
  updateDevice: (data: unknown) => localAxios.post('/status', data),
};

export default endpoints;
