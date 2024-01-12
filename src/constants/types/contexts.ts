import { CurrencyType, IDevicesType, INotification, IRate, IUser } from '@constants/types/index';

export interface IAuthContext {
  isLoaded: boolean;
  user: IUser | null;
  token: string | null;
  loginRedirect?: string | null;
  setUser: (user: IUser) => void;
  setToken: (token: string | null) => void;
  setRedirectUrl: (url: string) => void;
  logOut: () => void;
}

export interface ICurrencyContext {
  isOpened: boolean;
  isRemember: boolean;
  usdRates: IRate;
  currency: CurrencyType;
  open: () => void;
  close: () => void;
  toggle: () => void;
  changeCurrency: (currency: CurrencyType, remember?: boolean) => void;
}

export interface IDeviceContext {
  devices: IDevicesType[] | null;
  selectedDevice: number[] | null;
  selectedActuation: number[] | null;
  isLoaded: boolean;
  renderState: number;
  setSelectedDevice: (scriptId?: number, deviceId?: number, valueId?: number) => void;
  setSelectedActuation: (scriptId: number, deviceId: number, valueId?: number) => void;
  saveDevices: () => void;
  revertValues: () => void;
  loadData: (artId: string) => void;
}

export interface IVideoContext {
  source: string | null;
  ref: HTMLVideoElement | null;
  duration: number;
  currentTime: number;
  isLoaded: boolean;
  speed: number;
  setRef: (current: HTMLVideoElement | null) => void;
  seekTo: (time: number) => void;
  toggleVideo: () => void;
  onVideoLoad: () => void;
  setSource: (src: string) => void;
  setSpeed: (speed: number) => void;
  revertValues: () => void;
}

export interface INotificationContext {
  newsCount: number;
  notifications: INotification[] | null;
  readNotification: (index: number) => void;
  addNotification: (data: INotification) => void;
}

export interface IPopUpContext {
  isOpened: boolean;
  type: string | null;
  data: unknown;
  open: (type: string) => void;
  close: () => void;
  toggle: () => void;
  setData: (data: unknown) => void;
}
