import { ChangeEvent, useEffect, useState } from 'react';
import api from '@services/api';
import CurrencyField from '../CurrencyField';
import Summary from '../Summary';

import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface ICurrencyState {
  value: string;
  type: number;
}

const initialState = {
  value: '300',
  type: 0,
};

const FIAT_OPTIONS = [
  {
    value: 'USD',
    label: '$ USD',
    rateName: 'USD',
  },
  {
    value: 'EUR',
    label: '€ EUR',
    rateName: 'EUR',
  },
  {
    value: 'JPY',
    label: '¥ JPY',
    rateName: 'JPY',
  },
  {
    value: 'GBP',
    label: '£ GBP',
    rateName: 'GBP',
  },
];

const CRYPTO_OPTIONS = [
  {
    value: 'ETH',
    label: 'ETH',
    image: BlackEthIcon,
    rateName: 'ETH',
  },
  {
    value: 'MATIC',
    label: 'MATIC',
    image: PolygonIcon,
    rateName: 'MATIC',
  },
];

const FiatForm = () => {
  const [fiat, setFiat] = useState<ICurrencyState>(initialState);
  const [crypto, setCrypto] = useState<ICurrencyState>(initialState);

  const getSummary = async (fiatIndex: number, cryptoIndex: number) => {
    try {
      const fiat = FIAT_OPTIONS[fiatIndex];
      const crypto = CRYPTO_OPTIONS[cryptoIndex];

      await api.coinbase.getRateByName(`${crypto.rateName}-${fiat.rateName}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onFiatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value < 0) return;

    setFiat(prevState => ({
      ...prevState,
      value,
    }));
  };

  const onCryptoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value < 0) return;

    setCrypto(prevState => ({
      ...prevState,
      value,
    }));
  };

  const onCurrencyChange = (name: string, index: number) => {
    if (name === 'crypto') {
      setCrypto(prevState => ({
        ...prevState,
        type: index,
      }));
      return;
    }

    if (name === 'fiat') {
      setFiat(prevState => ({
        ...prevState,
        type: index,
      }));
    }
  };

  useEffect(() => {
    getSummary(fiat.type, crypto.type);
  }, [fiat, crypto]);

  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>Buy crypto</h1>
      <CurrencyField
        label="I want to spend"
        value={fiat.value}
        options={FIAT_OPTIONS}
        activeOption={fiat.type}
        currencyName="fiat"
        onChange={onFiatChange}
        onCurrencyChange={onCurrencyChange}
      />
      <CurrencyField
        label="I want to buy"
        value={crypto.value}
        options={CRYPTO_OPTIONS}
        activeOption={crypto.type}
        currencyName="crypto"
        onChange={onCryptoChange}
        onCurrencyChange={onCurrencyChange}
      />
      <Summary value="vzgo" />
      <button className={styles.root__submit}>Continue</button>
    </div>
  );
};

export default FiatForm;
