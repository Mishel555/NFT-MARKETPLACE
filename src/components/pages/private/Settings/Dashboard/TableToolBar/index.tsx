import { ExcelIcon } from '@components/icons';
import Selector from '../Selector';

import styles from './style.module.scss';

interface IProps {
  tables: string[];
  selectedTable: number;
  changeTable: (tableIndex: number) => void;
  exportXLS: () => void;
}

const TableToolBar = ({
  tables,
  selectedTable,
  exportXLS,
  changeTable,
}: IProps) => (
  <div className={styles.root}>
    <Selector data={tables} selectedData={selectedTable} changeData={changeTable} />
    <div className={styles.root__actions}>
      <button type="button" onClick={exportXLS} className={styles.root__export}>
        <ExcelIcon width={16} height={16} />
        Export to XLS
      </button>
    </div>
  </div>
);

export default TableToolBar;
