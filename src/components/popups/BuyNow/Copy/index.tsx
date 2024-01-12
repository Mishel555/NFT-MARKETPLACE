import { AvailableNetworks, IArtUser } from '@constants/types';
import { getProfilePublicRoute, getWithoutNDecimal } from '@utils';
import { useCurrency } from '@hooks';
import { InternalLink } from '@components/atoms';

import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  seller: IArtUser;
  title: string;
  preview: string;
  price: number;
  blockchain: AvailableNetworks;
}

const Copy = ({
  seller,
  title,
  preview,
  blockchain,
  price,
}: IProps) => {
  const { usdRates } = useCurrency();

  return (
    <div className={styles.root}>
      <div className={styles.root__preview}>
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
        <div className={styles.root__price}>
          <div className={styles.root__price_wrapper}>
            <img
              src={blockchain === 'polygon' ? PolygonIcon : BlackEthIcon}
              alt="blockchain"
              className={styles.root__price_icon}
            />
            <h2 className={styles.root__price_price}>{price}</h2>
          </div>
          <span className={styles.root__price_usd}>
            $ {getWithoutNDecimal(price * usdRates[blockchain], 2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Copy;
