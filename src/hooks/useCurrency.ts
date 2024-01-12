import { useContext } from 'react';
import currencyContext from '@contexts/CurrencyContext';

const useCurrency = () => useContext(currencyContext);

export default useCurrency;
