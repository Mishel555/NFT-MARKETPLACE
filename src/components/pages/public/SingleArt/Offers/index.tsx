import { useState } from 'react';
import classNames from 'classnames';
import { AVAILABLE_NETWORKS } from '@constants/web3';
import { AvailableNetworks, IBid, IArtUser } from '@constants/types';
import { useCurrency } from '@hooks';
import { getProfilePublicRoute, getWithoutNDecimal } from '@utils';
import { InternalLink } from '@components/atoms';
import { CaretArrowIcon } from '@components/icons';

import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  bids: IBid[];
  users: { [key: string]: IArtUser };
  blockchain: AvailableNetworks;
}

const Offers = ({
  bids,
  users,
  blockchain,
}: IProps) => {
  const { usdRates } = useCurrency();
  const [show, setShow] = useState<boolean>(true);
  const toggle = () => setShow(prevState => !prevState);

  return (
    <div className={styles.root}>
      <div className={styles.root__intro}>
        <h2 className={styles.root__subtitle}>
          Offers
        </h2>
        <button onClick={toggle} className={classNames(styles.root__intro_btn, show && styles.root__intro_active)}>
          <CaretArrowIcon fill="#000" />
        </button>
      </div>
      {show && (
        <div className={classNames(styles.root__main, animatedStyles.born_via_fade)}>
          <div className={styles.root__head}>
            <h2 className={styles.root__title}>Price</h2>
            <h2 className={styles.root__title}>USD Price</h2>
            <h2 className={styles.root__title}>From</h2>
          </div>
          <div className={styles.root__wrapper}>
            {bids.map(({
              price,
              user,
            }, index) => (
              <div key={index} className={styles.root__item}>
                <p className={styles.root__text}>{price} {AVAILABLE_NETWORKS[blockchain].currency}</p>
                <p className={styles.root__text}>
                  $ {getWithoutNDecimal(price * usdRates[blockchain], 3)}
                </p>
                <p className={styles.root__text}>
                  {user && (
                    <InternalLink to={getProfilePublicRoute(user, users[user].role?.name)}>
                      {users[user]?.header ?? users[user]?.login ?? users[user]?.full}
                    </InternalLink>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;
