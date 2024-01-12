import { useMemo } from 'react';
import { AvailableNetworks } from '@constants/types';
import { getChainCurrency, getWithoutNDecimal } from '@utils';
import { useCurrency } from '@hooks';

import Icon from '@assets/icons/auction-info-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  price: number;
  blockchain: AvailableNetworks;
}

const Info = ({
  price,
  blockchain,
}: IProps) => {
  const { usdRates } = useCurrency();

  const { minEth, minUsd } = useMemo(() => {
    const minPrice = price + price * 20 / 100;
    const minPriceUsd = getWithoutNDecimal(minPrice * usdRates[blockchain], 5);

    return {
      minEth: getWithoutNDecimal(minPrice, 5),
      minUsd: minPriceUsd,
    };
  }, [blockchain, price, usdRates]);

  return (
    <div className={styles.root}>
      <p className={styles.root__text}>
        Make sure you have sufficient balance
        to participate an Auction.
      </p>
      <img src={Icon} alt="icon" className={styles.root__icon} />
      <p className={styles.root__bold}>
        This action required to reserve USD {minUsd} / {minEth} {getChainCurrency(blockchain)}
      </p>
    </div>
  );
};

export default Info;
