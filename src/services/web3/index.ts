import nft from './methods/nft';
import balance from './methods/balance';
import auction from './methods/auction';
import membership from './methods/membership';

// const defaultGas = '1000000';
// const higherGas = '3000000';
const web3 = {
  nft,
  balance,
  auction,
  membership,
};

export default web3;
