import { useEffect, useState } from 'react';
import { UserRoles } from '@constants/types';
import { getArtistProfit, getWithoutNDecimal } from '@utils';
import styles from './style.module.scss';

interface IProps {
  price: number;
  userRole: UserRoles;
  galleryFee: number;
  collaboratorsFees: number[];
  count: number;
  resell?: boolean;
}

const Profit = ({
  price,
  userRole,
  galleryFee,
  collaboratorsFees,
  count,
  resell,
}: IProps) => {
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    const profit = getArtistProfit({
      price,
      role: userRole,
      galleryFee,
      collaboratorsFees,
      resold: resell || false,
    });

    setProfit(profit);
  }, [price, userRole, galleryFee, resell, collaboratorsFees]);

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>Total Potential Profit</h4>
      <p className={styles.root__profit}>
        $ {getWithoutNDecimal(count * profit, 3)}
      </p>
    </div>
  );
};

export default Profit;
