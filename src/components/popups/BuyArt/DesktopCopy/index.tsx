import { ChangeEvent } from 'react';
import { AvailableNetworks, IArtUser } from '@constants/types';
import { getProfilePublicRoute, getWithoutNDecimal } from '@utils';
import { useCurrency } from '@hooks';
import { Checkbox, InternalLink } from '@components/atoms';
import Input from '../Input';
import Counter from '../Counter';

import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  title: string;
  price: number;
  count: number;
  preview: string;
  maxCount: number;
  checked: boolean;
  seller: IArtUser;
  highlight: boolean;
  blockchain: AvailableNetworks;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CURRENCY_ICONS = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
};

const DesktopCopy = ({
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
      <div className={styles.root__preview}>
        <Checkbox
          key={`${checked}`}
          highlight={highlight}
          id={`check${seller['_id']}_${price}`}
          defaultChecked={checked}
          onChange={handleCheckbox}
        />
        <img src={preview} alt="preview" className={styles.root__preview_img} />
        <div className={styles.root__preview_wrapper}>
          <h1 className={styles.root__preview_title}>
            {title}
          </h1>
          <InternalLink to={getProfilePublicRoute(seller['_id'], seller.role?.name)} className={styles.root__preview_user}>
            @{seller.header ?? seller.login}
          </InternalLink>
        </div>
      </div>
      <div className={styles.root__item}>
        <Counter count={maxCount} />
      </div>
      <div className={styles.root__item}>
        <div className={styles.root__price}>
          <div className={styles.root__price_wrapper}>
            <img
              alt="blockchain"
              src={CURRENCY_ICONS[blockchain]}
              className={styles.root__price_icon}
            />
            <h2 className={styles.root__price_price}>{price}</h2>
          </div>
          <span className={styles.root__price_usd}>
            $ {getWithoutNDecimal(price * usdRates[blockchain], 2)}
          </span>
        </div>
      </div>
      <div className={styles.root__item}>
        <Input value={count} onChange={handleInput} />
      </div>
      <div className={styles.root__item}>
        <div className={styles.root__price}>
          <div className={styles.root__price_wrapper}>
            <img
              alt="blockchain"
              src={CURRENCY_ICONS[blockchain]}
              className={styles.root__price_icon}
            />
            <h2 className={styles.root__price_price}>{getWithoutNDecimal(+count * price, 5)}</h2>
          </div>
          <span className={styles.root__price_usd}>
            $ {getWithoutNDecimal(+count * price * usdRates[blockchain], 2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesktopCopy;
