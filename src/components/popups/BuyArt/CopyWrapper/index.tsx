import { ChangeEvent, Fragment, useState } from 'react';
import { AvailableNetworks, IArtUser, INft } from '@constants/types';
import { getWithoutNDecimal } from '@utils';
import DesktopCopy from '../DesktopCopy';
import MobileCopy from '../MobileCopy';

interface IChangeCart {
  seller: string;
  count: number;
  price: number;
  total: number;
  checked: boolean;
  nfts: INft[];
}

interface IProps {
  seller: IArtUser;
  title: string;
  preview: string;
  highlight: boolean;
  price: number;
  nfts: INft[];
  blockchain: AvailableNetworks;
  maxCount: number;
  setCart: (args: IChangeCart) => void;
}

const CopyWrapper = ({
  nfts,
  price,
  title,
  seller,
  preview,
  highlight,
  maxCount,
  blockchain,
  setCart,
}: IProps) => {
  const [count, setCount] = useState<number>(1);
  const [checked, setChecked] = useState<boolean>(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value;

    if (value < 1) {
      value = 1;
    }

    if (value > maxCount) {
      value = count || 1;
    }

    setCart({
      nfts,
      price,
      checked,
      count: value,
      seller: seller.wallet || seller['_id'],
      total: getWithoutNDecimal(+value * price, 5),
    });

    setCount(value || 1);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setCart({
      nfts,
      price,
      checked,
      count: +count,
      seller: seller.wallet || seller['_id'],
      total: getWithoutNDecimal(+count * price, 5),
    });

    setChecked(checked);
  };

  return (
    <Fragment>
      <DesktopCopy
        title={title}
        price={price}
        count={count}
        seller={seller}
        checked={checked}
        preview={preview}
        highlight={highlight}
        maxCount={maxCount}
        blockchain={blockchain}
        handleInput={handleInput}
        handleCheckbox={handleCheckbox}
      />
      <MobileCopy
        title={title}
        price={price}
        count={count}
        seller={seller}
        checked={checked}
        preview={preview}
        highlight={highlight}
        maxCount={maxCount}
        blockchain={blockchain}
        handleInput={handleInput}
        handleCheckbox={handleCheckbox}
      />
    </Fragment>
  );
};

export default CopyWrapper;
