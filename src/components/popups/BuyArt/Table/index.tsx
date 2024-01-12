import { AvailableNetworks, ICopy, INft } from '@constants/types';
import Toolbar from '../Toolbar';
import List from '../List';

import styles from './style.module.scss';

interface IProps {
  copies: ICopy[] | null;
  preview: string;
  blockchain: AvailableNetworks;
  onSearch: (search: string) => void;
  highlight: boolean;
  changeCart: (args: {
    seller: string;
    count: number;
    price: number;
    total: number;
    checked: boolean;
    nfts: INft[];
  }) => void;
}

const Table = ({ copies, highlight, preview, blockchain, onSearch, changeCart }: IProps) => (
  <div className={styles.root}>
    <Toolbar search={onSearch} />
    <List
      highlight={highlight}
      copies={copies}
      preview={preview}
      blockchain={blockchain}
      changeCart={changeCart}
    />
  </div>
);

export default Table;
