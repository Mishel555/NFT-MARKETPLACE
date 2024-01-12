import { usePopup } from '@hooks';
import { IAuctionNotification } from '@constants/types';
import Info from './Info';
import Actions from './Actions';
import styles from './styles.module.scss';

const AuctionNotification = ({
  price,
  blockchain,
  offerProps,
}: IAuctionNotification) => {
  const {
    open,
    close,
    setData,
  } = usePopup();

  const accept = () => {
    setData(offerProps);
    open('offer_nft');
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__container}>
        <h1 className={styles.root__title}>Notification</h1>
        <Info price={price} blockchain={blockchain} />
        <Actions accept={accept} close={close} />
      </div>
    </div>
  );
};

export default AuctionNotification;
