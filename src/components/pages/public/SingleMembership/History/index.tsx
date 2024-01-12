import { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { AVAILABLE_NETWORKS } from '@constants/web3';
import { AvailableNetworks, IArtHistory, IArtUser } from '@constants/types';
import { getProfilePublicRoute } from '@utils';
import { ExternalLink, InternalLink } from '@components/atoms';
import { CaretArrowIcon } from '@components/icons';

import BlackArrowTop from '@assets/icons/black-top-arrow.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  users: { [key: string]: IArtUser };
  history: IArtHistory[];
  blockchain: AvailableNetworks;
}

const History = ({ users, history, blockchain }: IProps) => {
  const [show, setShow] = useState<boolean>(true);
  const toggle = () => setShow(prevState => !prevState);

  return (
    <div className={styles.root}>
      <div className={styles.root__intro}>
        <h2 className={styles.root__subtitle}>
          HISTORY
        </h2>
        <button onClick={toggle} className={classNames(styles.root__intro_btn, show && styles.root__intro_active)}>
          <CaretArrowIcon fill="#000" />
        </button>
      </div>
      {show && (
        <div className={classNames(styles.root__main, show && animatedStyles.born_via_fade)}>
          <div className={styles.root__head}>
            <h2 className={styles.root__title}>Event</h2>
            <h2 className={styles.root__title}>Unit Price</h2>
            <h2 className={styles.root__title}>Quantity</h2>
            <h2 className={styles.root__title}>From</h2>
            <h2 className={styles.root__title}>To</h2>
            <h2 className={styles.root__title}>Date</h2>
          </div>
          <div className={styles.root__wrapper}>
            {history.map(({
              event,
              from,
              to,
              date,
              url,
              price,
              copies,
            }, index) => (
              <div key={index} className={styles.root__item}>
                <p className={styles.root__text}>{event}</p>
                <p className={styles.root__text}>
                  {price}
                  &nbsp;
                  {!!blockchain && AVAILABLE_NETWORKS[blockchain].nativeCurrency.symbol}
                </p>
                <p className={styles.root__text}>{copies ?? 1}</p>
                <p className={styles.root__text}>
                  {from && (
                    <InternalLink to={getProfilePublicRoute(from, users[from]?.role?.name)}>
                      {users[from]?.header ?? users[from]?.login ?? users[from]?.full}
                    </InternalLink>
                  )}
                </p>
                <p className={styles.root__text}>
                  {to && (
                    <InternalLink to={getProfilePublicRoute(to, users[to]?.role?.name)}>
                      {users[to]?.header ?? users[to]?.login ?? users[to]?.full}
                    </InternalLink>
                  )}
                </p>
                <p className={styles.root__date}>
                  <span>{moment(date).format('MMM D, YYYY hh:mm A')}</span>
                  <ExternalLink to={url}>
                    <img src={BlackArrowTop} alt="" />
                  </ExternalLink>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
