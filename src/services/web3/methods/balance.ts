import web3 from 'web3';
import { IAddFunds, IBalanceGet, IDefaultWeb3Params, IDropFunds } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import { ErcContract, ErcReadContract } from '@services/web3/client';

// functions names will be start with balance...

const balanceGet = async ({ address }: IBalanceGet & IDefaultWeb3Params) => {
  // eslint-disable-next-line
  const polygonFunds = await ErcReadContract.polygon.MARKETPLACE.methods._fundRecord(address).call();
  // eslint-disable-next-line
  // const ethereumFunds = await ErcReadContract.ethereum.MARKETPLACE.methods._fundRecord(address).call();

  return {
    // ethereum: +web3.utils.fromWei(ethereumFunds, 'ether'),
    ethereum: 0,
    polygon: +web3.utils.fromWei(polygonFunds, 'ether'),
  };
};

const balanceTopUp = async (data: IAddFunds & IDefaultWeb3Params) => {
  const { price, blockchain, address } = data;

  const amountWithoutDecimals = Number(getWithoutNDecimal(price, 6)).toFixed(4).toString();
  const weiAmount = web3.utils.toWei(amountWithoutDecimals, 'ether');

  return await ErcContract[blockchain].MARKETPLACE.methods.addFund(weiAmount).send({
    from: address,
    value: weiAmount,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const balanceDrop = async (data: IDropFunds & IDefaultWeb3Params) => {
  const { amount, blockchain, address } = data;

  const weiAmount = web3.utils.toWei(amount.toString(), 'ether');

  return await ErcContract[blockchain].MARKETPLACE.methods.dropFund(weiAmount).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

export default {
  balanceGet,
  balanceTopUp,
  balanceDrop,
};
