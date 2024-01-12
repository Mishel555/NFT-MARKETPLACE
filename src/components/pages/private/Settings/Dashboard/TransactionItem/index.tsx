import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ITransactionStats } from '@constants/types';
import TransactionPreview from '../TransactionPreview';
import TransactionDetails from '../TransactionDetails';

import styles from './style.module.scss';

interface IProps {
  data: ITransactionStats;
}

const TransactionItem = ({ data }: IProps) => {
  const { purchases } = useMemo(() => data, [data]);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [isShow, setIsShow] = useState<boolean>(false);

  const toggle = useCallback(() => setIsShow(prevState => !prevState), []);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      setIsShow(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div ref={rootRef} className={classNames(styles.root, isShow && styles.root_active)}>
      <TransactionPreview data={data} isActive={isShow} toggle={toggle} />
      {isShow && (
        <TransactionDetails
          purchases={purchases.map((purchase) => ({
            ...purchase,
            artist: data.artist,
          }))}
        />
      )}
    </div>
  );
};

export default TransactionItem;
