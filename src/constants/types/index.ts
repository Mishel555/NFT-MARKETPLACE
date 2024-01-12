import { ReactElement, ReactNode } from 'react';
import { IMarkProps, IThumbProps, ITrackProps } from 'react-range/lib/types';
import { FieldValues } from 'react-hook-form';

import { ETemplates } from './enums';
import { AvailableNetworks } from './web3';
import { ICollaborator } from './data';

export * from './data';
export * from './web3';
export * from './contexts';

export type DeviceOptions = 'markIntensity' | 'sliderIntensity' | 'type' | 'color' | 'temperature';
export type IntensityRangeTypes = 'marker' | 'slider';
export type UserRoles = 'user' | 'gallery' | 'artist' | 'admin';
export type ArtType = 'video' | 'image';
export type CurrencyType = 'USD' | 'ETH';
export type MembershipType = 'none' | 'Standard Membership' | 'Platinum Membership';

// custom types for TABS...
export type CustomArtTypes = 'inMyReview' | 'galleryDefault' | 'allArtworks';

export type RequestStatusType = 'approvedByAdminAt'
  | 'approvedByGalleryAt'
  | 'acceptedOfferAt'
  | 'rejectedByAdminAt'
  | 'rejectedByGalleryAt'
  | 'declinedOfferAt'
  | 'inReviewByAdmin';

export type ArtStatusType = CustomArtTypes |
  'processed' // newly created NFT
  | 'processing' // processing VIDEO/IMAGE, ex. compressing
  | 'approved' // approved by admin and ready to publish
  | 'approval' // approved by gallery and waits for admin approval
  | 'rejected' // stands for admin/gallery reject
  | 'published' // ready for BUY
  | 'sold out' // out of stock
  | 'closed' // auction ended
  | 'onCollaboratorsReview' // all collaborators in review
  | 'onGalleryApproval' // approved from all collaborators and waiting to gallery
  | 'owned'; // owned from authorized user

export type CollaboratorStatusType = 'done' | 'declined' | 'pending';

export interface IRoute {
  path: string;
  element: ReactElement;
  title?: string;
  tabTitle?: string;
  counter?: number;
  mode?: 'private' | 'guest';
  roles?: UserRoles[];
  template?: ETemplates;
}

export interface IModifiedUntraceableTrackProps {
  props: ITrackProps;
  children: ReactNode;
}

export interface IModifiedTrackProps {
  props: ITrackProps;
  children: ReactNode;
  value: number[];
  min: number;
  max: number;
  colors?: string[];
  setValueId?: (id: number | undefined) => void;
  selectCurrentDevice?: () => void;
  selectCurrentActuation?: (id?: number) => void;
}

export interface IModifiedThumbProps {
  props: IThumbProps;
  isDragged?: boolean;
  index?: number;
  values?: number[];
  selected?: boolean;
  thumbHeight?: number;
  showTime?: boolean;
  setIsDragged?: () => void;
  edit?: (index: number) => void;
  remove?: (index: number) => void;
}

export interface IModifiedMarkProps {
  props: IMarkProps;
  index?: number;
}

export interface ILightRGB {
  red: number;
  green: number;
  blue: number;
  value: number;
}

export interface IScriptType {
  values: number[];
  value?: number; // intensity ( 'value' more comfortable than 'intensity' for devices )
  color?: ILightRGB;
  temperature?: string;
  type?: string;
  typeId?: number;
}

export interface IDeviceData {
  id: number;
  name: string;
  title: string;
  type: string;
  options?: DeviceOptions[];
  preview?: string;
  typeList?: {
    id: number;
    title: string;
  }[];
  minDuration: number;
  maxDuration?: number;
  scripts: IScriptType[];
}

export interface IDevicesType {
  title: string;
  data: IDeviceData[];
}

export interface IDevice {
  id: number;
  type: string;
  name: string;
  state: 'on' | 'off';
  temperature: string;
  color: ILightRGB;
  value: number;
  typeId: number;
}

export interface IData {
  time: number;
  devices: Array<IDevice>;
}

export interface IScriptInitialType {
  value?: number;
  type?: string;
  typeId?: number;
  temperature?: string;
  color?: ILightRGB;
}

export interface IActuationDevice {
  id: number;
  name: string;
  state: 'on' | 'off';
  type?: string;
  typeId?: number;
  value?: number;
  temperature?: 'hot' | 'cold';
  color?: ILightRGB;
}

// Actuations back part interface
export interface IActuationType {
  time: number;
  devices: IActuationDevice[];
}

// user interfaces
export interface IFee {
  amounts: number[];
  percents: number[];
}

export interface IRequest {
  _id: string;
  artist: IUser;
  gallery: IUser;
  createdAt: string;
  approvedByAdminAt: string;
  approvedByGalleryAt: string;
  acceptedOfferAt: string;
  rejectedByAdminAt: string;
  rejectedByGalleryAt: string;
  declinedOfferAt: string;
  reason: string;
  fee: IFee;
}

export interface IBasicUser {
  login?: string;
  name: {
    first: string;
    last: string;
  };
}

export interface IGalleryUser {
  galleryId: number;
  header: string;
  description?: string;
  taxOffice: string;
  website?: string;
  isDefault?: boolean;
  members: IUser[];
  artSubmissions: number;
  artistRequests: number;
  artists: number;
  hasStandardMembership?: boolean;
  hasPlatinumMembership?: boolean;
}

export interface IArtistUser {
  login?: string;
  name: {
    first: string;
    last: string;
  };
  links?: string[];
  website?: string;
  gallery: IUser;
  portfolio: string;
  fee: IFee;
  bio?: string;
}

export interface IArtUser {
  _id: string;
  email: string;
  wallet: string;
  role?: IRole;
  login?: string;
  header?: string;
  full?: string;
}

export interface IUserDeposit {
  nftId: number;
  amount: number;
  art: {
    _id: string;
    title: string;
    blockchain: AvailableNetworks;
  };
}

export interface IUser extends IBasicUser, IGalleryUser, IArtistUser {
  _id: string;
  id: string;
  email: string;
  role: IRole;
  myLikes: number;
  artLikes: number;
  currency: CurrencyType | null;
  arts: number;
  artworks: number;
  avatar: string;
  banner: string;
  full: string;
  createdAt: string;
  requests: IRequest[];
  settings: { notifications: IUserNotification };
  copies: {
    _id: string;
    art: string;
    price: number;
    onSale: boolean;
  }[];
  hash?: string;
  wallet?: string;
  verifiedAt?: string;
  approvedAt?: string;
  deletedAt?: string;
  manifesto?: string;
  about?: string;
  address?: string;
  phone?: string;
  dateOfBirth?: string;
  subscriptions?: IPushSubscription[];
  notifications: INotification[];
  isPublishedStandard?: boolean;
  isPublishedPlatinum?: boolean;
}

export interface IBalances {
  ethereum: number;
  polygon: number;
}

export interface IPushSubscription extends PushSubscription {
  keys: {
    p256dh: ArrayBuffer;
  };
}

export interface INotification {
  message: string;
  read: boolean;
  date: string;
}

export interface IUserNotification {
  [key: string]: 'push' | 'mail' | 'both' | 'none';
}

export interface IMockNotification {
  [key: string]: IMockNotificationItem[];
}

export interface IMockNotificationItem {
  key: string;
  text: string;
  title?: string;
}

export interface IMembershipPlan {
  label: string;
  standard: 'yes' | 'no' | 'paid';
  platinum: 'yes' | 'no' | 'paid';
  nonMember: 'yes' | 'no' | 'paid';
  platinumFeature?: string;
}

// user role response interface
export interface IRole {
  _id: string;
  name: UserRoles;
  __v: number;
}

// emotion response interface
export interface IEmotion {
  _id: string;
  name: string;
  __v: number;
}

// type response interface
export interface ITypes {
  _id: string;
  name: string;
  __v: number;
  special?: boolean;
}

// Video info interface
export interface IVideoMetaInfo {
  avg_frame_rate: string;
  bit_rate: string;
  duration: string;
  width: number;
  height: number;
  size: number;
  type: string;
  codec_name: string;
  blockchain?: AvailableNetworks;
  contractTx?: string;
}

export interface INft {
  _id: string;
  seller: string;
  owner: string;
  price: number;
  nftId: number;
}

export interface ICopy {
  title: string;
  seller: IArtUser;
  price: number;
  availableCount: number;
  nfts: INft[];
}

export interface IAuction {
  bids: IBid[];
  endsAt: string;
  closedAt?: string;
  prices: {
    start: number;
    buyNow?: number;
    minimum?: number;
  };
}

// Art interface
export interface IProfileArtType {
  _id: string;
  actuations: IActuationType[];
  category: string;
  createdAt: string;
  description: string;
  users: { [key: string]: IArtUser };
  emotions: IEmotion[];
  type: ITypes;
  history: IArtHistory[];
  image: string;
  preview: string;
  full: string;
  thumb: string;
  status: ArtStatusType;
  title: string;
  likes: number;
  liked: boolean;
  price: number;
  updatedAt: string;
  artist: IUser;
  info: IVideoMetaInfo;
  collaborators: ICollaborator[];
  isImage?: boolean;
  reason?: string;
  blockchain?: AvailableNetworks;
  copies?: INft[];
  copiesForSale?: number;
  auction?: IAuction;
  doIOwn?: boolean;
  doIOwnNotSelling?: number;
}

export interface IArtHistory {
  event: 'sold' | 'minted' | 'closed';
  from: string;
  date: string;
  url: string;
  tx: string;
  to?: string;
  price?: number;
  copies?: number;
}

export interface IBid {
  _id: string;
  price: number;
  date: string;
  user: string;
}

export interface IMarketArt {
  _id: string;
  user: IUser;
  price: number;
  likes: number;
  art: IProfileArtType;
}

export interface IAvailableCropDimensions {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  maxSize: number;
  minSize?: number;
}

// Cropper JS custom types...
export interface ICropperImageElement extends HTMLImageElement {
  cropper: {
    getData: () => ICropperData;
    getCropBoxData: () => ICropperCropBoxData;
    getCroppedCanvas: () => HTMLCanvasElement;
    setData: (data: ICropperData) => void;
    setCropBoxData: (data: ICropperCropBoxData) => void;
    zoom: (ratio: number) => void;
  };
}

export interface ICropperData {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface ICropperCropBoxData {
  width: number;
  height: number;
  top: number;
  left: number;
}

// Components props types
export interface ITextFieldProps {
  element: 'input' | 'textarea';
  label?: string;
  name: string;
  placeholder?: string;
  maxLength?: number;
}

export interface IPasswordFieldProps {
  label?: string;
  name: string;
}

export interface ILinkedTabs {
  label: string;
  to: string;
  external?: boolean;
  counter?: number;
}

export interface INameValue {
  name: string;
  value: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface IArtAction {
  name: string;
  fn: (...args: any[]) => void;
  disallowedKeys?: string[];
}

/* eslint-enable @typescript-eslint/no-explicit-any */

export interface INetwork {
  [key: string]: IChain;
}

export interface IChain {
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  currency: string;

  chainId: number;
  blockExplorerUrls: string[];
}

export interface ISettingsPath {
  [key: string]: {
    path: string;
    label: string;
    image: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

export interface IBanner {
  _id: string;
  title?: {
    label: string;
    color: string;
  };
  description?: {
    label: string;
    color: string;
  };
  countdown?: {
    endsAt: string;
    color: string;
  };
  url?: string;
  image: string | File;
  buttonName?: string;
  __v?: string;
}

export interface IBannerColor {
  label: string;
  hex: string;
}

export interface IExhibition {
  _id: string;
  title: string;
  date: string;
  description?: string;
  url?: string;
  image?: string;
  location: {
    city?: string;
    state?: string;
  };
  organizer: IUser;
  artists: IUser[];
  curatedBy: IUser[];
  sArtists?: string;
  sCuratedBy?: string;
  isEditable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IExhibitionUserList {
  artists: IUser[];
  galleries: IUser[];
}

export interface IBannersResponse {
  __v: string;
  _id: string;
  title?: string;
  descr?: string;
  image: string;
  titleColor: string;
  descrColor: string;
  countdownColor: string;
  link?: string;
  buttonName?: string;
  endsAt?: string;
}

// Popups types...
export interface IArtPublishProps {
  art: IProfileArtType;
  resell?: boolean;
  cb?: () => void;
  loadFn: () => void;
}

export interface IRejectProps {
  id: string;
  adminReject: (id: string, reason: FieldValues) => void;
}

export interface IArtRemoveProps {
  close: () => void;
  confirm: () => void;
  id: string;
}

export interface IDeleteConfirmProps {
  confirm: () => void;
  firstMessage: string;
  secondMessage?: string;
}

export interface IImageUploaderProps {
  availableDimensions: IAvailableCropDimensions;
  cb: (image: Blob) => void;
}

export interface IEffectPreview {
  type: string;
}

export interface IBuyArt {
  id: string;
  cb?: (...args: unknown[]) => void;
}

export interface IBuyMembershipPopup {
  id: string;
  upgrade?: boolean;
  cb?: (...args: unknown[]) => void;
}

export interface IArtPreviewProps {
  id: string;
  src: string;
}

export interface ICreateNftProps {
  cb?: (...args: unknown[]) => void;
}

export interface IEditPreviewProps {
  id: string;
  image: string;
  cb?: (image: string) => void;
}

export interface IOfferNftProps {
  artId: string;
  cb?: (bid: IBid) => void;
}

export interface IAuctionNotification {
  price: number;
  blockchain: AvailableNetworks;
  offerProps: IOfferNftProps;
}

export interface IAddFundsPopup {
  artId: string;
  price: number;
  tokenId: number;
  blockchain: AvailableNetworks;
  cb?: () => void;
}

export interface IBuyNow {
  id: string;
  cb?: () => void;
}

export interface IEditDetails {
  id: string;
  cb?: (art: IProfileArtType) => void;
}

export interface ITransactionStats {
  _id: string;
  title: string;
  artist: IUser;
  image: string;
  profit: number;
  revenue: number;
  purchases: ITransactionPurchase[];
}

export interface IUserStats {
  _id: string;
  name: { first: string; last: string };
  full: string;
  email: string;
  avatar: string;
  banner: string;
  artsSold: number;
  copiesSold: number;
  artsResold: number;
  artistFee: number;
  galleryFee: number;
  adminFee: number;
  aifFee: number;
  profit: number;
  revenue: number;
  likes: number;
  role: UserRoles;
}

export interface ITransactionPurchase {
  _id: string;
  nftIds: string[];
  artist: IUser;
  seller: IUser;
  buyer: IUser;
  likes: number;
  blockchain: AvailableNetworks;
  contractTX: string;
  type: string;
  oldPrice: number;
  price: number;
  revenue: number;
  profit: number;
  artistProfit: number;
  artistFee: number;
  galleryFee: number;
  adminFee: number;
  aifFee: number;
  createdAt: number;
  updatedAt: number;
  __v: number;
}

// Forms types...
export interface ISettingsFormField {
  label: string;
  name: keyof IAccountDetailsFormValues | keyof ISecurityFormValues | 'name.first' | 'name.last';
  placeholder: string;
  type: 'text' | 'area' | 'tel' | 'password' | 'date';
}

export interface IAccountDetailsFormValues {
  email: string;
  login: string;
  header: string;
  name: { first: string; last: string };
  description: string;
  taxOffice: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  manifesto: string;
  about: string;
  bio: string;
  portfolio: string;
  website: string;
  links: string[];
}

export interface ISecurityFormValues {
  current: string;
  password: string;
  confirm: string;
}

export interface IBannersFormValues {
  title?: {
    label: string;
    color: string;
  };
  description?: {
    label: string;
    color: string;
  };
  countdown?: {
    endsAt: string;
    color: string;
  };
  url: string;
  image: string;
  buttonName?: string;
}

export interface IExhibitionFormValues {
  _id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  url: string;
  day: string;
  month: string;
  year: string;
}

export interface IFormCollaborator {
  key: string;
  id: string;
  username: string;
  fee: number;
  role?: UserRoles;
  comment?: string;
  feedback?: string;
}

export interface IFixedPublishFormValues {
  price: number;
  quantity: number;
  blockchain: AvailableNetworks;
  membership?: MembershipType;
  collaborators: IFormCollaborator[];
  save?: boolean;
}

export interface IAuctionPublishFormValues {
  endDate: string;
  startPrice: number;
  buyNowPrice?: number;
  minimumPrice?: number;
  collaborators: IFormCollaborator[];
  blockchain: AvailableNetworks;
  save?: boolean;
}

export interface IExhibitionSubmitArgs {
  _id: string;
  title: string;
  date: string;
  artists?: string[];
  curatedBy?: string[];
  sArtists?: string;
  sCuratedBy?: string;
  description?: string;
  url?: string;
  city?: string;
  state?: string;
  image?: File | Blob;
  preview?: string;
}

export type AvailableBannersFormNames =
  'title'
  | 'image'
  | 'description'
  | 'url'
  | 'title.label'
  | 'title.color'
  | 'countdown.endsAt'
  | 'description.label'
  | 'description.color'
  | 'countdown.color'
  | 'buttonName';

// CHARTS
export interface IDashboardChartConfig {
  chart: number;
  dateMode: number;
  loadItems: string[] | null;
}

export interface IDashboardChart {
  label: string;
  name: string;
  sold: number;
  resold: number;
  total: number;
  amount: number;
  date: string; // X => convert by date mode, like 11, 05, 2022...
}
