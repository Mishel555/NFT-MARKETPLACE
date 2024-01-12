import { Fragment } from 'react';
import moment from 'moment';
import { ITransactionPurchase } from '@constants/types';
import { getProfilePublicRoute, getWithoutNDecimal } from '@utils';
import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  purchases: ITransactionPurchase[];
}

const TransactionDetails = ({ purchases }: IProps) => (
  <Fragment>
    {purchases.map(({
      contractTX,
      artist,
      createdAt,
      nftIds,
      galleryFee,
      aifFee,
      adminFee,
      profit,
      revenue,
      type,
      buyer,
    }, index) => (
      <div key={index} className={styles.root}>
        <div className={styles.root__item_md}>
          <p className={styles.root__title}>TransactionID</p>
          <p className={styles.root__label}>
            {contractTX.split('').splice(0, 10).join('')}...
          </p>
        </div>
        <div className={styles.root__item_lg}>
          <p className={styles.root__title}>Date of Transaction</p>
          <p className={styles.root__label}>{moment(createdAt).format('DD-MM-YY')}</p>
        </div>
        <div className={styles.root__item_md}>
          <p className={styles.root__title}>Username</p>
          <InternalLink to={getProfilePublicRoute((buyer['_id'], buyer.role.name))} className={styles.root__label}>
            {buyer.header ?? buyer.login}
          </InternalLink>
        </div>
        <div className={styles.root__item_md}>
          <p className={styles.root__title}>Artist name</p>
          <InternalLink to={getProfilePublicRoute(artist['_id'], artist.role.name)} className={styles.root__label}>
            {artist.full}
          </InternalLink>
        </div>
        <div className={styles.root__item_md}>
          <p className={styles.root__title}>Gallery name</p>
          {!!artist.gallery && (
            <InternalLink to={getProfilePublicRoute(artist.gallery['_id'], artist.gallery.role.name)} className={styles.root__label}>
              {artist.gallery?.header}
            </InternalLink>
          )}
        </div>
        <div className={styles.root__item_lg}>
          <p className={styles.root__title}>Type of transaction</p>
          <p className={styles.root__label}>{type}</p>
        </div>
        <div className={styles.root__item_xl}>
          <p className={styles.root__title}>Number of copies sold</p>
          <p className={styles.root__label}>{type === 'sell' ? nftIds.length : 'n/a'}</p>
        </div>
        <div className={styles.root__item_xl}>
          <p className={styles.root__title}>Number of copies resold</p>
          <p className={styles.root__label}>{type !== 'sell' ? nftIds.length : 'n/a'}</p>
        </div>
        <div className={styles.root__item_xl}>
          <p className={styles.root__title}>Fees of Gallery (USD)</p>
          <p className={styles.root__bold}>$ {getWithoutNDecimal(galleryFee, 7)}</p>
        </div>
        <div className={styles.root__item_lg}>
          <p className={styles.root__title}>Fees of AIF (USD)</p>
          <p className={styles.root__bold}>$ {getWithoutNDecimal(aifFee, 7)}</p>
        </div>
        <div className={styles.root__item_lg}>
          <p className={styles.root__title}>Fees of Admin (USD)</p>
          <p className={styles.root__bold}>$ {getWithoutNDecimal(adminFee, 7)}</p>
        </div>
        <div className={styles.root__item_xl}>
          <p className={styles.root__title}>Net Profit of Artist (USD)</p>
          <p className={styles.root__bold}>$ {getWithoutNDecimal(profit, 7)}</p>
        </div>
        <div className={styles.root__item_xl}>
          <p className={styles.root__title}>Total revenue (USD)</p>
          <p className={styles.root__bold}>$ {getWithoutNDecimal(revenue, 7)}</p>
        </div>
      </div>
    ))}
  </Fragment>
);

export default TransactionDetails;
