import { AvailableNetworks, ICopy, INft } from '@constants/types';
import CopyWrapper from '../CopyWrapper';

import styles from './style.module.scss';

interface IProps {
  copies: ICopy[] | null;
  preview: string;
  highlight: boolean;
  blockchain: AvailableNetworks;
  changeCart: (args: {
    seller: string;
    count: number;
    price: number;
    total: number;
    checked: boolean;
    nfts: INft[];
  }) => void;
}

const List = ({
  copies,
  preview,
  highlight,
  blockchain,
  changeCart,
}: IProps) => (
  <div className={styles.root}>
    {copies?.map(({
      title,
      price,
      availableCount,
      seller,
      nfts,
    }) => (
      <CopyWrapper
        key={`${seller['_id']}_${price}`}
        title={title}
        preview={preview}
        seller={seller}
        highlight={highlight}
        price={price}
        nfts={nfts}
        blockchain={blockchain}
        maxCount={availableCount}
        setCart={changeCart}
      />
    ))}
  </div>
);

export default List;
