import { createContext } from 'react';
import { IVideoContext } from '@constants/types';

export const VideoManageContext = createContext<IVideoContext>({
  ref: null,
  duration: 1,
  currentTime: 1,
  isLoaded: false,
  source: '',
  speed: 1,
  setRef: () => {},
  seekTo: () => {},
  toggleVideo: () => {},
  onVideoLoad: () => {},
  setSource: () => {},
  setSpeed: () => {},
  revertValues: () => {},
});
