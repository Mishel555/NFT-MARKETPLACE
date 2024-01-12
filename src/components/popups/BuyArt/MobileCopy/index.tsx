import { ChangeEvent } from 'react';
import { AvailableNetworks, IArtUser } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import { useCurrency } from '@hooks';
import { Checkbox } from '@components/atoms';
import Counter from '../Counter';
import Input from '../Input';

import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  title: string;
  price: number;
  count: number;
  preview: string;
  maxCount: number;
  seller: IArtUser;
  checked: boolean;
  highlight: boolean;
  blockchain: AvailableNetworks;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CURRENCY_ICONS = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
};

const MobileCopy = ({
  count,
  title,
  price,
  seller,
  preview,
  checked,
  highlight,
  maxCount,
  blockchain,
  handleInput,
  handleCheckbox,
}: IProps) => {
  const { usdRates } = useCurrency();

  return (
    <div className={styles.root}>
      <div className={styles.root__content}>
        <Checkbox
          key={`${checked}`}
          highlight={highlight}
          id={`check${seller['_id']}_${price}`}
          defaultChecked={checked}
          onChange={handleCheckbox}
        />
        <img src={preview} alt="preview" className={styles.root__image} />
        <div className={styles.root__meta}>
          <h1 className={styles.root__meta_title}>{title}</h1>
          <p className={styles.root__meta_user}>
            @{seller.header ?? seller.login}
          </p>
        </div>
      </div>
      <div className={styles.root__wrapper}>
        <p className={styles.root__wrapper_title}>Available</p>
        <Counter count={maxCount} />
      </div>
      <div className={styles.root__wrapper}>
        <p className={styles.root__wrapper_title}>Price</p>
        <div className={styles.root__content}>
          <p className={styles.root__price}>
            <img src={CURRENCY_ICONS[blockchain]} alt="crypto" className={styles.root__icon} />
            {price}
          </p>
          <p className={styles.root__usd}>
            $ {getWithoutNDecimal(price * usdRates[blockchain], 2)}
          </p>
        </div>
      </div>
      <div className={styles.root__wrapper}>
        <p className={styles.root__wrapper_title}>Quantity</p>
        <Input value={count} onChange={handleInput} />
      </div>
      <div className={styles.root__wrapper}>
        <p className={styles.root__wrapper_title}>Total</p>
        <div className={styles.root__content}>
          <p className={styles.root__price}>
            <img src={CURRENCY_ICONS[blockchain]} alt="crypto" className={styles.root__icon} />
            {getWithoutNDecimal(+count * price, 5)}
          </p>
          <p className={styles.root__usd}>
            $ {getWithoutNDecimal(+count * price * usdRates[blockchain], 2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileCopy;
