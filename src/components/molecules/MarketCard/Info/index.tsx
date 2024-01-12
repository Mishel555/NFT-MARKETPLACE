import { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IArtAction, IProfileArtType } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import { useAuth, useCurrency, usePopup } from '@hooks';
import Actions from '../Actions';

import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import UsdIcon from '@assets/icons/usd-grey-icon.svg';
import EthIcon from '@assets/icons/black-eth-icon.svg';
import styles from './style.module.scss';

interface IProps {
  art: IProfileArtType;
  actions?: IArtAction[];
  price?: number;
  isUsd?: boolean;
  showStatus?: boolean;
}

const LABELS: { [key: string]: string } = {
  processed: 'Draft',
  approval: 'Admin Approval',
  review: 'Collaborators\' review',
  pending: 'Gallery Approval',
  rejected: 'Rejected',
  onCollaboratorsReview: 'My Team Artwork',
  onGalleryApproval: 'Gallery Approval',
};

const Info = ({ art, actions, price, isUsd, showStatus }: IProps) => {
  const navigate = useNavigate();
  const popup = usePopup();
  const { user, setRedirectUrl } = useAuth();
  const { usdRates } = useCurrency();
  const {
    id,
    artName,
    artPrice,
    blockchain,
    copyCount,
    auction,
    status,
  } = useMemo(() => ({
    id: art['_id'],
    artName: art.title,
    artPrice: isUsd ? getWithoutNDecimal((price ?? 0) * usdRates[art.blockchain ?? 'ethereum'], 2) : price,
    blockchain: art.blockchain,
    copyCount: art.copiesForSale,
    auction: art.auction,
    status: art.status,
  }), [art, isUsd, price, usdRates]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const showBuyButton = useMemo(() => Boolean(copyCount && !actions?.length), [copyCount, actions]);

  const buyArt = useCallback(async () => {
    if (!user) {
      navigate('/signIn');

      if (auction) {
        return setRedirectUrl(`/art/${id}?open=offer`);
      }

      return setRedirectUrl(`/art/${id}?open=buy`);
    }

    if (auction) {
      return navigate(`/art/${id}`);
    }

    popup.setData({ id });
    popup.open('buy_art');
  }, [user, auction, popup, id, navigate, setRedirectUrl]);

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.root__top}>
        <p className={styles.root__title}>
          {artName}
        </p>
      </div>
      {showStatus && (
        <p className={styles.root__status}>
          Status: {LABELS[status] ?? status}
        </p>
      )}
      <div className={styles.root__bottom}>
        <div className={styles.root__price}>
          <p className={styles.root__price__text}>Price</p>
          {isUsd ? (
            <img
              alt="usd"
              src={UsdIcon}
              className={styles.root__price_icon_usd}
            />
          ) : (
            <img
              alt="blockchain"
              src={blockchain === 'ethereum' ? EthIcon : PolygonIcon}
              className={styles.root__price_icon_eth}
            />
          )}
          <span className={styles.root__price__number}> {artPrice} </span>
        </div>
        {showBuyButton && (
          <button onClick={buyArt} className={styles.root__collect}>
            Collect
          </button>
        )}
        {!!actions?.length && (
          <Actions art={art} actions={actions} />
        )}
      </div>
    </div>
  );
};

export default Info;
