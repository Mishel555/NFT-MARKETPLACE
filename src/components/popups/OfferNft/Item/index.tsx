import { AvailableNetworks, IArtUser, IUser } from '@constants/types';
import { SingleUser } from '@components/atoms';

import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  title: string;
  image: string;
  owner: IUser;
  blockchain: AvailableNetworks;
}

const images: { [key in AvailableNetworks]: string } = {
  ethereum: BlackEthIcon,
  polygon: PolygonIcon,
};

const Item = ({
  title,
  image,
  owner,
  blockchain,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__item}>
      <div className={styles.root__wrapper}>
        <img src={image} alt="art" className={styles.root__item_img} />
        <div>
          <h1 className={styles.root__item_title}>
            {title}
          </h1>
          <SingleUser user={owner as IArtUser} />
        </div>
      </div>
    </div>
    <div className={styles.root__total}>
      <div className={styles.root__wrapper}>
        <img src={images[blockchain]} alt="blockchain" className={styles.root__blockchain} />
        <span className={styles.root__price}>--</span>
      </div>
      <p className={styles.root__usd}>$ --</p>
    </div>
  </div>
);

export default Item;
