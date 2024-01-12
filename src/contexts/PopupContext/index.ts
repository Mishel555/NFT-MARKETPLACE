import { createContext } from 'react';
import { IPopUpContext } from '@constants/types';

// creating AUTH context/data for app
export const PopupContext = createContext<IPopUpContext>({
  type: null,
  isOpened: false,
  data: null,
  open: () => {},
  close: () => {},
  toggle: () => {},
  setData: () => {},
});
