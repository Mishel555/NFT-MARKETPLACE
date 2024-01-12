import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AvailableNetworks, IArtHistory, IArtUser, INft, IUser, MembershipType } from '@constants/types';
import api from '@services/api';
import { useAuth, usePopup } from '@hooks';
import TitleSection from '../TitleSection';
import FixedBuy from '../FixedBuy';
import DescriptionSection from '../DescriptionSection';
import History from '../History';

import styles from './style.module.scss';

interface IProps {
  id: string;
  price: number;
  title: string;
  creator: IUser;
  status: string;
  description: string;
  type: MembershipType;
  history: IArtHistory[];
  users: { [key: string]: IArtUser };
  copies?: INft[];
  blockchain?: AvailableNetworks;
  copiesForSale?: number;
}

const TopSection = ({
  id,
  type,
  price,
  title,
  description,
  history,
  blockchain,
  copiesForSale,
  status,
  copies,
  users,
}: IProps) => {
  const popup = usePopup();
  const navigate = useNavigate();
  const { user, setRedirectUrl } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const openPopup = searchParams.get('open');

  const availableCounts = useMemo<number>(() => {
    if (!copies || !copies.length) {
      return 0;
    }

    if (!user) {
      return copies.filter(copy => !copy.owner).length;
    }

    return copies?.filter(copy => (!copy.owner && copy.seller) ? copy.seller !== user['_id'] : false).length;
  }, [copies, user]);

  const [availableForBuy, setAvailableForBuy] = useState<boolean>(false);
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [copyCount, setCopyCount] = useState<number>(copiesForSale || 0);
  const [localHistory, setLocalHistory] = useState<IArtHistory[]>(history);

  const buyCb = useCallback(async () => {
    try {
      const { data } = await api.art.getSingle(id);

      setLocalHistory(data.history);
      setCopyCount(prevState => prevState - 1);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const buyArt = useCallback(async (upgrade?: boolean) => {
    if (!user || !blockchain) {
      setRedirectUrl(`/membership/${id}?open=buy`);
      return navigate('/signIn');
    }

    popup.setData({
      id,
      cb: buyCb,
      upgrade,
    });

    popup.open('buy_membership');
  }, [user, navigate]);

  useEffect(() => {
    if (status !== 'published') {
      setAvailableForBuy(false);
      return;
    }

    if (!user) {
      setShowPrice(true);
      setAvailableForBuy(true);
      return;
    }

    if (!blockchain) {
      setShowPrice(false);
      setAvailableForBuy(false);
      return;
    }

    if (!copyCount) {
      setShowPrice(true);
      setAvailableForBuy(false);
      return;
    }

    setShowPrice(true);
    setAvailableForBuy(true);
  }, []);

  useEffect(() => {
    if (!openPopup) return;
    switch (openPopup) {
      case 'buy':
        setTimeout(buyArt, 500);
        break;
    }

    setSearchParams({});
  }, [openPopup]);

  return (
    <div className={styles.root}>
      <div className={styles.root__info}>
        <div className={styles.root__info_wrapper}>
          <TitleSection title={title} type={type} />
          <DescriptionSection description={description} />
        </div>
        {!availableForBuy && !showPrice && blockchain && (
          <div className={styles.root__info_wrapper}>
            <History history={history} blockchain={blockchain} users={users} />
          </div>
        )}

        {(availableForBuy || showPrice) && blockchain && (
          <div className={styles.root__info_wrapper}>
            <FixedBuy
              price={price}
              copyCount={copyCount}
              blockchain={blockchain}
              availableCounts={availableCounts}
              availableForBuy={availableForBuy}
              currentType={type}
              buyArt={buyArt}
            />
            <History history={localHistory} blockchain={blockchain} users={users} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSection;
