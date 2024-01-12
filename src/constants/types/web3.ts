import { ICollaborator } from '@constants/types/data';

export type isListed = 'True' | 'False';
export type AvailableNetworks = 'ethereum' | 'polygon';

export interface IRate {
  ethereum: number;
  polygon: number;
}

export interface ICreateAuction {
  artId: string;
  minPrice: number;
  galleryFee: number;
  galleryAddress: string;
  blockchain: AvailableNetworks;
  collaborators: ICollaborator[];
  duration: number;
  maxPrice?: number;
  reservePrice?: number;
}

export interface IEndAuction {
  tokenId: number;
  close: boolean;
  blockchain: AvailableNetworks;
}

export interface IBuyNft {
  price: number;
  seller: string;
  tokenId: number;
  quantity: number;
  blockchain: AvailableNetworks;
}

export interface IBuyMembership {
  type: string;
  price: number;
  blockchain: AvailableNetworks;
}

export interface IUpgradeMembership {
  price: number;
  newType: string;
  currentType: string;
  blockchain: AvailableNetworks;
}

export interface IMultipleBuy {
  tokenIds: number[];
  counts: number[];
  sellers: string[];
  amount: number;
  blockchain: AvailableNetworks;
}

export interface IAddFunds {
  price: number;
  blockchain: AvailableNetworks;
}

export interface IDropFunds {
  amount: number;
  blockchain: AvailableNetworks;
}

export interface IBidArgs {
  amount: number;
  tokenId: number;
  blockchain: AvailableNetworks;
}

export interface ICreateSelling {
  artId: string;
  price: number;
  quantity: number;
  galleryFee: number;
  galleryAddress: string;
  blockchain: AvailableNetworks;
  collaborators: ICollaborator[];
}

export interface IResellNft {
  price: number;
  tokenId: number;
  quantity: number;
  blockchain: AvailableNetworks;
}

export interface IResellAuction {
  tokenId: number;
  duration: number;
  minPrice: number;
  maxPrice?: number;
  reservePrice?: number;
  blockchain: AvailableNetworks;
}

export interface IMintMembership {
  artId: string;
  type: string;
  price: number;
  blockchain: AvailableNetworks;
}

export interface IBalanceGet {
  address: string;
  blockchain: AvailableNetworks;
}

// ================= CONTRACT TYPES =================
export interface IRateResponse {
  id: string;
  explorer: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  supply: string;
  symbol: string;
}

export interface IContractDefaultResponse {
  status: boolean;
  transactionHash: string;
}

interface INftItemCreated {
  returnValues: {
    tokenId: number;
    price: number;
    qty: number;
    creator: string;
    isListed: isListed;
  };
}

export interface ICreateSellingResponse extends IContractDefaultResponse {
  events: {
    SaleCreated: INftItemCreated;
  };
}

export interface IMintMembershipResponse extends IContractDefaultResponse {
  events: {
    MembershipCreated: INftItemCreated;
  };
}

export interface ICreateAuctionResponse extends IContractDefaultResponse {
  events: {
    AuctionCreated: INftItemCreated;
  };
}

export interface IDefaultWeb3Params {
  address: string;
}

type Web3MethodsParamMap = {
  // nft types
  nftMint: ICreateSelling;
  nftBuy: IBuyNft;
  nftMultipleBuy: IMultipleBuy;
  nftSell: IResellNft;
  // balance types
  balanceGet: IBalanceGet;
  balanceTopUp: IAddFunds;
  balanceDrop: IDropFunds;
  // auction
  auctionMint: ICreateAuction;
  auctionSell: IResellAuction;
  auctionEnd: IEndAuction;
  auctionEndBySeller: IEndAuction;
  auctionBidFromBalance: IBidArgs;
  // membership
  membershipMint: IMintMembership;
  membershipBuy: IBuyMembership;
  membershipUpgrade: IUpgradeMembership;
}

type Web3MethodsResponseMap = {
  // nft types
  nftMint: ICreateSellingResponse;
  nftBuy: IContractDefaultResponse;
  nftMultipleBuy: IContractDefaultResponse;
  nftSell: IContractDefaultResponse;
  // balance types
  balanceGet: IRate;
  balanceTopUp: IContractDefaultResponse;
  balanceDrop: IContractDefaultResponse;
  // auction
  auctionMint: ICreateAuctionResponse;
  auctionSell: IContractDefaultResponse;
  auctionEnd: IContractDefaultResponse;
  auctionEndBySeller: IContractDefaultResponse;
  auctionBidFromBalance: IContractDefaultResponse;
  // membership
  membershipMint: IMintMembershipResponse;
  membershipBuy: IContractDefaultResponse;
  membershipUpgrade: IContractDefaultResponse;
}

export type Web3MethodsType = keyof Web3MethodsParamMap;

export type Web3ParamsType<T extends Web3MethodsType> = Web3MethodsParamMap[T];
export type Web3ResponseType<T extends Web3MethodsType> = Web3MethodsResponseMap[T];

export type Web3ServiceGroupType = 'nft' | 'balance' | 'auction' | 'membership';
