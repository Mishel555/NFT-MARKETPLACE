import { useMemo } from 'react';
import classNames from 'classnames';
import { IUserStats } from '@constants/types';
import { getProfilePublicRoute, getWithoutNDecimal } from '@utils';
import { ImageWithFallback, InternalLink } from '@components/atoms';
import styles from './style.module.scss';

interface IProps {
  data: IUserStats;
}

const UserItem = ({ data }: IProps) => {
  const {
    _id,
    role,
    full,
    avatar,
    artsSold,
    artsResold,
    copiesSold,
    artistFee,
    galleryFee,
    aifFee,
    adminFee,
    revenue,
    profit,
  } = useMemo(() => data, [data]);

  return (
    <div className={styles.root}>
      <div className={classNames(styles.root__xl, styles.root__wrapper)}>
        <ImageWithFallback fallback="defaultAvatar" src={avatar} className={styles.root__avatar} />
        <InternalLink to={getProfilePublicRoute(_id, role)} className={styles.root__bold}>
          {full}
        </InternalLink>
      </div>
      <div className={styles.root__xl}>
        <p className={styles.root__title}>Number of NFT's sold</p>
        <p className={styles.root__label}>{artsSold}</p>
      </div>
      <div className={styles.root__xl}>
        <p className={styles.root__title}>Number of copies sold</p>
        <p className={styles.root__label}>{copiesSold}</p>
      </div>
      <div className={styles.root__xl}>
        <p className={styles.root__title}>Number of NFT's resold</p>
        <p className={styles.root__label}>{artsResold}</p>
      </div>
      <div className={styles.root__lg}>
        <p className={styles.root__title}>Fees of creator (USD)</p>
        <p className={styles.root__bold}>$ {getWithoutNDecimal(artistFee, 7)}</p>
      </div>
      <div className={styles.root__lg}>
        <p className={styles.root__title}>Fees of gallery (USD)</p>
        <p className={styles.root__bold}>$ {getWithoutNDecimal(galleryFee, 7)}</p>
      </div>
      <div className={styles.root__lg}>
        <p className={styles.root__title}>Fees of AIF (USD)</p>
        <p className={styles.root__bold}>$ {getWithoutNDecimal(aifFee, 7)}</p>
      </div>
      <div className={styles.root__lg}>
        <p className={styles.root__title}>Fees of Admin (USD)</p>
        <p className={styles.root__bold}>$ {getWithoutNDecimal(adminFee, 7)}</p>
      </div>
      <div className={styles.root__xl}>
        <p className={styles.root__title}>Net Profit of artist (USD)</p>
        <p className={styles.root__bold}>$ {getWithoutNDecimal(profit, 7)}</p>
      </div>
      <div className={styles.root__lg}>
        <p className={styles.root__title}>Total revenue (USD)</p>
        <p className={styles.root__bold}>$ {getWithoutNDecimal(revenue, 7)}</p>
      </div>
    </div>
  );
};

export default UserItem;
