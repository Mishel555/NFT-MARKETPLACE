import { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNetwork } from 'wagmi';
import { AxiosError } from 'axios';
import { useAuth, useWeb3, useCurrency, usePopup } from '@hooks';
import { AvailableNetworks } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import Loading from '../Loading';

import TransferIcon from '@assets/icons/fund-transfer-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  artId: string;
  price: number;
  tokenId: number;
  blockchain: AvailableNetworks;
  cb?: () => void;
}

const CryptoForm = ({
  price,
  blockchain,
  cb,
}: IProps) => {
  const { send } = useWeb3();
  const { close } = usePopup();
  const { user } = useAuth();
  const { usdRates } = useCurrency();

  const { chain } = useNetwork();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { minEth, minUsd } = useMemo(() => {
    const minPrice = price + price * 20 / 100;
    const minPriceUsd = getWithoutNDecimal(minPrice * usdRates[blockchain], 5);

    return {
      minEth: getWithoutNDecimal(minPrice, 5),
      minUsd: minPriceUsd,
    };
  }, [blockchain, price, usdRates]);

  const [value, setValue] = useState<string>(minEth.toString() || '');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (+value < 0) return;

    setValue(value);
  };

  const submit = async () => {
    try {
      if (!user || !value) return;

      setLoading(true);

      const amount = +value;

      await send('balanceTopUp', {
        blockchain,
        price: amount,
      });

      if (cb) {
        cb();
      }

      toast.success('You\'ve successfully added funds to the balance');
      setLoading(false);
      close();
    } catch (e) {
      const error = e as AxiosError;
      setLoading(false);

      toast.error(error.message ? error.message : e as string);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Fragment>
      <div className={styles.root}>
        <p className={styles.root__text}>Transfer funds from your wallet</p>
        <p className={styles.root__text}>to your auction balance</p>
        <img src={TransferIcon} alt="icon" className={styles.root__image} />
        <p className={styles.root__text}>
          This action required to reserve
        </p>
        <p className={styles.root__text}>
          minimum USD {minUsd} / {minEth} {chain?.nativeCurrency.symbol}
        </p>
        <div className={styles.root__form}>
          <input
            ref={inputRef}
            type="number"
            value={value}
            onChange={onChange}
            step={0.001}
            placeholder="funds"
            className={styles.root__form_input}
          />
          <button
            onClick={submit}
            disabled={!value}
            className={styles.root__form_btn}
          >
            Add
          </button>
        </div>
      </div>
      {loading && (
        <Loading />
      )}
    </Fragment>
  );
};

export default CryptoForm;
