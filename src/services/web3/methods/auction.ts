import web3 from 'web3';
import { IBidArgs, ICreateAuction, IDefaultWeb3Params, IEndAuction, IResellAuction } from '@constants/types';
import { WEB_API_ORIGIN } from '@constants/environment';
import { ErcContract } from '@services/web3/client';
import api from '@services/api';
import { getWithoutNDecimal } from '@utils';

// functions names will be start with auction...

const auctionMint = async (data: ICreateAuction & IDefaultWeb3Params) => {
  const {
    artId,
    duration,
    minPrice,
    maxPrice,
    reservePrice,
    galleryFee,
    blockchain,
    galleryAddress,
    collaborators,
    address,
  } = data;

  const fee = galleryFee * 100;
  const fixedMinPrice = getWithoutNDecimal(+minPrice, 6).toString();
  const fixedMaxPrice = maxPrice ? getWithoutNDecimal(+maxPrice, 6).toString() : null;
  const fixedReservePrice = reservePrice ? getWithoutNDecimal(+reservePrice, 6).toString() : null;

  const weiMinPrice = web3.utils.toWei(fixedMinPrice, 'ether');
  const weiMaxPrice = fixedMaxPrice ? web3.utils.toWei(fixedMaxPrice, 'ether') : 0;
  const weiReservePrice = fixedReservePrice ? web3.utils.toWei(fixedReservePrice, 'ether') : 0;

  const collaboratorsWallets = collaborators.map(coll => coll.user.wallet);
  const collaboratorsFees = collaborators.map(coll => coll.fee * 100); // send fee * 100

  const tokenURI = `${WEB_API_ORIGIN}/api/art/${artId}/nftInfo`;

  const { data: { signature } } = await api.web3.getArtSignature(artId, { quantity: 1, blockchain });

  const validDuration = +duration < 901 ? 901 : duration;

  return await ErcContract[blockchain].MARKETPLACE.methods.createAuction(
    tokenURI,
    weiMinPrice,
    weiMaxPrice,
    weiReservePrice,
    validDuration,
    fee,
    galleryAddress,
    collaboratorsWallets, // COLLABORATORS => not implemented yet.
    collaboratorsFees, // COLLABORATOR FEE'S => not implemented yet.
    signature,
  ).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const auctionSell = async (data: IResellAuction & IDefaultWeb3Params) => {
  const {
    tokenId,
    minPrice,
    reservePrice,
    maxPrice,
    blockchain,
    duration,
    address,
  } = data;

  const fixedMinPrice = getWithoutNDecimal(+minPrice, 6).toString();
  const fixedMaxPrice = maxPrice ? getWithoutNDecimal(+maxPrice, 6).toString() : null;
  const fixedReservePrice = reservePrice ? getWithoutNDecimal(+reservePrice, 6).toString() : null;

  const weiMinPrice = web3.utils.toWei(fixedMinPrice, 'ether');
  const weiMaxPrice = fixedMaxPrice ? web3.utils.toWei(fixedMaxPrice, 'ether') : 0;
  const weiReservePrice = fixedReservePrice ? web3.utils.toWei(fixedReservePrice, 'ether') : 0;
  const validDuration = +duration < 901 ? 901 : duration;

  return await ErcContract[blockchain].MARKETPLACE.methods.resaleWithAuction(
    tokenId,
    weiMinPrice,
    weiMaxPrice,
    weiReservePrice,
    validDuration,
  ).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const auctionEnd = async (data: IEndAuction & IDefaultWeb3Params) => {
  const { tokenId, blockchain, address } = data;

  return await ErcContract[blockchain].MARKETPLACE.methods.endAuction(tokenId).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const auctionEndBySeller = async (data: IEndAuction & IDefaultWeb3Params) => {
  const { tokenId, blockchain, address } = data;

  return await ErcContract[blockchain].MARKETPLACE.methods.endAuctionBySeller(tokenId, close).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const auctionBidFromBalance = async (data: IBidArgs & IDefaultWeb3Params) => {
  const { amount, tokenId, blockchain, address } = data;

  const amountWithoutDecimals = Number(getWithoutNDecimal(+amount, 6)).toFixed(4).toString();
  const value = web3.utils.toWei(amountWithoutDecimals.toString(), 'ether');

  return await ErcContract[blockchain].MARKETPLACE.methods.bidAuction(tokenId, value).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

export default {
  auctionMint,
  auctionSell,
  auctionEnd,
  auctionEndBySeller,
  auctionBidFromBalance,
};
