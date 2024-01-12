import axios from '../axios';

const endpoints = {
  getSignature: (data: unknown) => axios.post('/web3/sign', data),
  getArtSignature: (id: string, data: unknown) => axios.post(`/art/${id}/sign`, data),
  getChains: () => axios.get('https://chainid.network/chains.json'),
};

export default endpoints;
