import web3 from 'web3';
import { IBuyNft, ICreateSelling, IDefaultWeb3Params, IMultipleBuy, IResellNft } from '@constants/types';
import { WEB_API_ORIGIN } from '@constants/environment';
import { getWithoutNDecimal } from '@utils';
import { ErcContract } from '@services/web3/client';
import api from '@services/api';

// functions names will be start with nft...

const nftMint = async (data: ICreateSelling & IDefaultWeb3Params) => {
  const {
    artId,
    price,
    quantity,
    galleryFee,
    galleryAddress,
    blockchain,
    collaborators,
    address,
  } = data;

  const fee = galleryFee * 100;
  const convertedPrice = web3.utils.toWei(price.toString(), 'ether');
  const collaboratorsWallets = collaborators.map(coll => coll.user.wallet);
  const collaboratorsFees = collaborators.map(coll => coll.fee * 100); // send fee * 100

  const tokenURI = `${WEB_API_ORIGIN}/api/art/${artId}/nftInfo`;

  const { data: { signature } } = await api.web3.getArtSignature(artId, { quantity, blockchain });

  return await ErcContract[blockchain].MARKETPLACE.methods.createSailing(
    tokenURI,
    convertedPrice,
    quantity,
    fee,
    galleryAddress,
    collaboratorsWallets,
    collaboratorsFees,
    signature,
  ).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const nftBuy = async (data: IBuyNft & IDefaultWeb3Params) => {
  const {
    price,
    seller,
    tokenId,
    quantity,
    blockchain,
    address,
  } = data;

  const amount = price * quantity;
  const changedAmount = web3.utils.toWei(amount.toString(), 'ether');

  return await ErcContract[blockchain].MARKETPLACE.methods.buy(tokenId, quantity, seller)
    .send({
      from: address, // default from address
      value: changedAmount,
      maxFeePerGas: null,
      maxPriorityFeePerGas: null,
    });
};

const nftMultipleBuy = async (data: IMultipleBuy & IDefaultWeb3Params) => {
  const {
    amount,
    tokenIds,
    sellers,
    counts,
    blockchain,
    address,
  } = data;

  const amountWithoutDecimals = Number(getWithoutNDecimal(+amount, 6)).toFixed(4).toString();
  const weiAmount = web3.utils.toWei(amountWithoutDecimals, 'ether');

  return await ErcContract[blockchain].MARKETPLACE.methods.multiBuy(tokenIds, counts, sellers).send({
    from: address,
    value: weiAmount,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

const nftSell = async (data: IResellNft & IDefaultWeb3Params) => {
  const {
    price,
    tokenId,
    quantity,
    blockchain,
    address,
  } = data;

  const amount = getWithoutNDecimal(+price, 6).toString();
  const weiAmount = web3.utils.toWei(amount, 'ether');

  return await ErcContract[blockchain].MARKETPLACE.methods.resell(tokenId, quantity, weiAmount).send({
    from: address,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
  });
};

export default {
  nftMint,
  nftBuy,
  nftMultipleBuy,
  nftSell,
};
