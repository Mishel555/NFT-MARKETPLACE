import web3 from 'web3';
import { IBuyMembership, IDefaultWeb3Params, IMintMembership, IUpgradeMembership } from '@constants/types';
import { WEB_API_ORIGIN } from '@constants/environment';
import { ErcContract } from '@services/web3/client';

// functions names will be start with membership...

const membershipMint = async (data: IMintMembership & IDefaultWeb3Params) => {
  const { artId, type, price, blockchain, address } = data;

  const weiPrice = web3.utils.toWei(price.toString(), 'ether');
  const convertedType = web3.utils.keccak256(type);

  const tokenURI = `${WEB_API_ORIGIN}/api/art/${artId}/nftInfo`;

  return await ErcContract[blockchain].MEMBERSHIP.methods.mintMembership(convertedType, tokenURI, weiPrice).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const membershipBuy = async (data: IBuyMembership & IDefaultWeb3Params) => {
  const { type, price, blockchain, address } = data;

  const changedAmount = web3.utils.toWei(price.toString(), 'ether');
  const convertedType = web3.utils.keccak256(type);

  return await ErcContract[blockchain].MEMBERSHIP.methods.submitMembership(convertedType).send({
    from: address,
    value: changedAmount,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const membershipUpgrade = async (data: IUpgradeMembership & IDefaultWeb3Params) => {
  const { price, newType, currentType, blockchain, address } = data;

  const changedAmount = web3.utils.toWei(price.toString(), 'ether');
  const convertedNewType = web3.utils.keccak256(newType);
  const convertedCurrentType = web3.utils.keccak256(currentType);

  return await ErcContract[blockchain].MEMBERSHIP.methods.upgradeMembership(convertedCurrentType, convertedNewType)
    .send({
      from: address, // default from address
      value: changedAmount,
      maxFeePerGas: null,
      maxPriorityFeePerGas: null,
    });
};

export default {
  membershipMint,
  membershipBuy,
  membershipUpgrade,
};
