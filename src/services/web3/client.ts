import Web3 from 'web3';
import { AVAILABLE_NETWORKS, MARKETPLACE_ABI, MEMBERSHIP_ABI, NFT_ABI } from '@constants/web3';
import {
  INFURA_API_KEY,
  ETHEREUM_NFT_TX,
  ETHEREUM_MARKETPLACE_TX,
  ETHEREUM_MEMBERSHIP_TX,
  POLYGON_NFT_TX,
  POLYGON_MARKETPLACE_TX,
  POLYGON_MEMBERSHIP_TX,
} from '@constants/environment';

const web3 = new Web3(Web3.givenProvider);
const readEthereumWeb3 = new Web3(new Web3.providers.HttpProvider(`${AVAILABLE_NETWORKS.ethereum.rpcUrls[0]}${INFURA_API_KEY}`));
const readPolygonWeb3 = new Web3(new Web3.providers.HttpProvider(AVAILABLE_NETWORKS.polygon.rpcUrls[0]));

export const ErcContract = {
  ethereum: {
    MEMBERSHIP: new web3.eth.Contract(MEMBERSHIP_ABI, ETHEREUM_MEMBERSHIP_TX),
    MARKETPLACE: new web3.eth.Contract(MARKETPLACE_ABI, ETHEREUM_MARKETPLACE_TX),
  },
  polygon: {
    MEMBERSHIP: new web3.eth.Contract(MEMBERSHIP_ABI, POLYGON_MEMBERSHIP_TX),
    MARKETPLACE: new web3.eth.Contract(MARKETPLACE_ABI, POLYGON_MARKETPLACE_TX),
  },
};

export const ErcReadContract = {
  ethereum: {
    NFT: new web3.eth.Contract(NFT_ABI, ETHEREUM_NFT_TX),
    MARKETPLACE: new readEthereumWeb3.eth.Contract(MARKETPLACE_ABI, ETHEREUM_MARKETPLACE_TX),
  },
  polygon: {
    NFT: new web3.eth.Contract(NFT_ABI, POLYGON_NFT_TX),
    MARKETPLACE: new readPolygonWeb3.eth.Contract(MARKETPLACE_ABI, POLYGON_MARKETPLACE_TX),
  },
};
