import { useMemo } from 'react';
import classNames from 'classnames';
import { ITransactionStats } from '@constants/types';
import { getProfilePublicRoute, getWithoutNDecimal } from '@utils';
import { CopyIcon, CaretArrowIcon } from '@components/icons';
import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  data: ITransactionStats;
  isActive: boolean;
  toggle: () => void;
}

const TransactionPreview = ({
  data,
  isActive,
  toggle,
}: IProps) => {
  const {
    _id,
    title,
    image,
    artist,
    profit,
    revenue,
    copiesCount,
  } = useMemo(() => ({
    ...data,
    copiesCount: data.purchases.reduce((currentValue, purchase) => currentValue + purchase.nftIds.length, 0),
  }), [data]);

  return (
    <div className={styles.root}>
      <div className={styles.root__imageSection}>
        <img src={image} alt="image" className={styles.root__imageSection_img} />
        <div>
          <p className={styles.root__title}>
            <InternalLink to={`/art/${_id}`}>{title}</InternalLink>
          </p>
          <InternalLink to={getProfilePublicRoute(artist['_id'], artist.role.name)} className={styles.root__text}>
            {artist.full}
          </InternalLink>
        </div>
      </div>
      <div className={styles.root__copiesSection}>
        <p className={styles.root__label}>Copies</p>
        <button
          onClick={toggle}
          className={classNames(styles.root__copiesSection_btn, isActive && styles.root__copiesSection_btn_active)}
        >
          <CopyIcon />
          {copiesCount}x
          <CaretArrowIcon fill="black" />
        </button>
      </div>
      <div className={styles.root__profitSection}>
        <p className={styles.root__label}>Net profit (USD)</p>
        <p className={styles.root__bold}>
          $ {getWithoutNDecimal(profit, 7)}
        </p>
      </div>
      <div className={styles.root__totalSection}>
        <p className={styles.root__label}>Total revenue (USD)</p>
        <p className={styles.root__bold}>
          $ {getWithoutNDecimal(revenue, 7)}
        </p>
      </div>
    </div>
  );
};

export default TransactionPreview;
