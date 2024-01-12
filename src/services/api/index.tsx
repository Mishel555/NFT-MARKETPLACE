import subscribe from './endpoints/subscribe';
import devices from './endpoints/devices';
import emotions from './endpoints/emotions';
import types from './endpoints/types';
import auth from './endpoints/auth';
import art from './endpoints/art';
import users from './endpoints/users';
import pages from './endpoints/page';
import rooms from './endpoints/rooms';
import requests from './endpoints/requests';
import coincap from './endpoints/coincap';
import coinbase from './endpoints/coinbase';
import banners from './endpoints/banners';
import events from './endpoints/events';
import stats from './endpoints/stats';
import web3 from './endpoints/web3';

const allEndpoints = {
  auth,
  art,
  emotions,
  devices,
  subscribe,
  types,
  users,
  pages,
  rooms,
  requests,
  coincap,
  coinbase,
  banners,
  events,
  stats,
  web3,
};

export default allEndpoints;
