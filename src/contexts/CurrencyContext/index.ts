import { createContext } from 'react';
import { ICurrencyContext } from '@constants/types';

const CurrencyContext = createContext<ICurrencyContext>({
  isOpened: false,
  isRemember: false,
  usdRates: {
    ethereum: 0,
    polygon: 0,
  },
  currency: 'ETH',
  open: () => {},
  close: () => {},
  toggle: () => {},
  changeCurrency: () => {},
});

export default CurrencyContext;
