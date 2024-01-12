import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { AvailableNetworks, MembershipType } from '@constants/types';
import { useAuth, usePopup } from '@hooks';
import Image from './Image';
import Info from './Info';

import styles from './style.module.scss';

interface IProps {
  id: string;
  title: string;
  image: string;
  price: number;
  copies: number;
  type: MembershipType;
  blockchain: AvailableNetworks;
}

const initialMembership = {
  hasStandardMembership: false,
  hasPlatinumMembership: false,
};

const MembershipCard = ({
  id,
  type,
  title,
  image,
  price,
  copies,
  blockchain,
}: IProps) => {
  const popup = usePopup();
  const navigate = useNavigate();
  const { user, setRedirectUrl } = useAuth();

  const { hasStandardMembership, hasPlatinumMembership } = user ? user : initialMembership;

  const isUpgrade = useMemo(() => (
    !hasPlatinumMembership && hasStandardMembership && type === 'Platinum Membership'
  ), [type, hasStandardMembership, hasPlatinumMembership]);

  const showBuy = useMemo(() => {
    if (!user) return true;

    if (hasPlatinumMembership) return false;

    if (hasStandardMembership && type === 'Standard Membership') return false;

    return user.role.name === 'gallery';
  }, [user, hasPlatinumMembership, hasStandardMembership, type]);

  const buy = async () => {
    try {
      if (!user) {
        setRedirectUrl(`/membership/${id}?open=buy`);
        return navigate('/signIn');
      }

      popup.setData({
        id,
        upgrade: isUpgrade,
        cb: () => navigate(`/membership/${id}`),
      });

      popup.open('buy_membership');
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      toast.error(`${error.response?.data.message}`);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  return (
    <div className={styles.root}>
      <Image id={id} src={image} />
      <Info
        title={title}
        price={price}
        copies={copies}
        available={showBuy}
        isUpgrade={!!isUpgrade}
        blockchain={blockchain}
        buy={buy}
      />
    </div>
  );
};

export default MembershipCard;
