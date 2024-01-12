import { ChangeEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { AVAILABLE_NETWORKS } from '@constants/web3';
import { AvailableNetworks, IBid } from '@constants/types';
import { useCurrency, usePopup } from '@hooks';
import { getWithoutNDecimal } from '@utils';

import styles from './style.module.scss';
import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';

interface IProps {
  artId: string;
  price: number;
  maxPrice?: number;
  blockchain: AvailableNetworks;
  tokenId?: number;
  disabled?: boolean;
  bid: (price: number) => void;
  cb?: (bid: IBid) => void;
}

const images: { [key in AvailableNetworks]: string } = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
};

const Form = ({
  artId,
  price,
  maxPrice,
  blockchain,
  disabled,
  tokenId,
  bid,
  cb,
}: IProps) => {
  const popup = usePopup();
  const { usdRates } = useCurrency();
  const [value, setValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      setErrorMessage(null);
    }

    const { value } = e.target;

    if (value.length > 6) return;

    if (+value < 0) return;

    setValue(value);
  };

  const confirm = () => {
    if (maxPrice && +value > maxPrice) {
      setErrorMessage('Offer cannot be higher than Max price');
      return;
    }

    if (+value <= price) {
      setErrorMessage('Offer cannot be lower or equal than Best offer');
      return;
    }

    bid(+value);
  };

  const addFunds = () => {
    popup.setData({
      artId,
      price,
      tokenId,
      blockchain,
      cb: () => {
        setTimeout(() => {
          popup.setData({
            artId,
            cb,
          });

          popup.open('offer_nft');
        }, 1000);
      },
    });
    popup.open('add_funds');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>Your offer</h4>
      <div className={styles.root__wrapper}>
        <div className={styles.root__form}>
          <div className={classNames(styles.root__inputArea, errorMessage && styles.root__inputArea_error)}>
            <input
              ref={inputRef}
              type="number"
              value={value}
              placeholder="amount"
              onChange={onChange}
              className={styles.root__inputArea_input}
            />
            <div className={styles.root__icon}>
              <img src={images[blockchain]} alt="blockchain" className={styles.root__icon_img} />
              <span>{AVAILABLE_NETWORKS[blockchain].currency}</span>
            </div>
          </div>
          <div className={styles.root__amount}>
            <p className={styles.root__amount_title}>Total offer amount:</p>
            <p className={styles.root__amount_text}>
              {value}
              &nbsp;
              {AVAILABLE_NETWORKS[blockchain].currency}
              &nbsp;
              ($ {getWithoutNDecimal(+value * usdRates[blockchain], 2)})
            </p>
          </div>
        </div>
        <div className={styles.root__actions}>
          <button onClick={addFunds} className={styles.root__button}>
            Add funds
          </button>
          <button disabled={disabled} onClick={confirm} className={styles.root__button}>
            Make offer
          </button>
        </div>
        {errorMessage && (
          <p className={styles.root__message}>{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Form;
