import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import CurrencyContext from '@contexts/CurrencyContext';
import { AvailableNetworks, CurrencyType, IRate, IRateResponse } from '@constants/types';
import api from '@services/api';
import { useAuth } from '@hooks';

interface IProps {
  children?: ReactNode;
}

const CurrencyProvider = ({ children }: IProps) => {
  const { user } = useAuth();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [currency, setCurrency] = useState<CurrencyType>('ETH');
  const [usdRates, setUsdRates] = useState<IRate>({
    ethereum: 0,
    polygon: 0,
  });

  const open = useCallback(() => setIsOpened(true), []);
  const close = useCallback(() => setIsOpened(false), []);
  const toggle = useCallback(() => setIsOpened(prevState => !prevState), []);

  const changeCurrency = useCallback(async (currency: CurrencyType, remember?: boolean) => {
    try {
      if (user) {
        await api.users.editMe({
          currency: remember ? currency : null,
        });
      }

      if (remember) {
        setIsRemember(true);
        localStorage.setItem('currency', currency);
      } else {
        setIsRemember(false);
        localStorage.removeItem('currency');
      }

      setCurrency(currency);
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (!user.currency) {
        setCurrency('ETH');
        setIsRemember(false);
      } else {
        setIsRemember(true);
        setCurrency(user.currency);
        localStorage.setItem('currency', user.currency);
      }
    } else {
      const currency = localStorage.getItem('currency') as CurrencyType | null;
      if (currency) {
        setIsRemember(true);
      }

      setCurrency(currency || 'ETH');
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data } = await api.coincap.getRates();
        const rates: { [key in AvailableNetworks]: IRateResponse } = {
          ethereum: data.data.find((item: IRateResponse) => item.id === 'ethereum'),
          polygon: data.data.find((item: IRateResponse) => item.id === 'polygon'),
        };

        if (mounted) {
          setUsdRates({
            ethereum: Number(rates.ethereum.priceUsd),
            polygon: Number(rates.polygon.priceUsd),
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const contextValue = useMemo(() => ({
    isOpened,
    isRemember,
    usdRates,
    currency,
    open,
    close,
    toggle,
    changeCurrency,
  }), [isOpened, isRemember, usdRates, currency, open, close, toggle, changeCurrency]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
