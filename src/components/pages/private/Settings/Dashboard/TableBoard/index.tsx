import { useCallback, useState } from 'react';
import { UserRoles } from '@constants/types';
import api from '@services/api';
import { downloadFile } from '@utils';
import TableToolBar from '../TableToolBar';
import TransactionTable from '../TransactionTable';
import UserTable from '../UserTable';
import EmptyMessage from '../EmptyMessage';

import styles from './style.module.scss';

interface IProps {
  userId: string;
  role: UserRoles;
}

const AVAILABLE_TABLES = {
  user: [
    'Transactions',
  ],
  gallery: [
    'Transactions',
    'Top artists',
  ],
  artist: [
    'Transactions',
  ],
  admin: [
    'Transactions',
    'Top artists',
    'Top galleries',
  ],
};

const TableBoard = ({ userId, role }: IProps) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [table, setTable] = useState<number>(0);

  const changeUrl = useCallback((url: string) => {
    if (downloadUrl !== url) {
      setDownloadUrl(url);
    }
  }, [downloadUrl]);

  const changeTable = useCallback((index: number) => {
    if (table !== index) {
      setTable(index);
    }
  }, [table]);

  const exportXLS = useCallback(async () => {
    if (!downloadUrl) {
      return;
    }

    const { data } = await api.stats.getCSV(downloadUrl);
    const csv = `data:text/csv;charset=utf-8,${encodeURI(data)}`;
    let fileName = '';

    if (table === 0) {
      fileName = 'transactions';
    } else if (table === 1) {
      fileName = 'top artists';
    } else {
      fileName = 'top galleries';
    }

    downloadFile(csv, fileName, 'csv');
  }, [downloadUrl, table]);

  return (
    <div className={styles.root}>
      <TableToolBar
        tables={AVAILABLE_TABLES[role]}
        selectedTable={table}
        exportXLS={exportXLS}
        changeTable={changeTable}
      />
      <div className={styles.root__wrapper}>
        {((() => {
          switch (AVAILABLE_TABLES[role][table]) {
            case 'Transactions':
              return <TransactionTable setCSVUrl={changeUrl} />;
            case 'Top artists':
              return (
                <UserTable
                  groupBy="artist"
                  {...(role === 'gallery' && ({ galleryId: userId }))}
                  setCSVUrl={changeUrl}
                />
              );
            case 'Top galleries':
              return <UserTable groupBy="gallery" setCSVUrl={changeUrl} />;
            default:
              return <EmptyMessage dataName={AVAILABLE_TABLES[role][table]} />;
          }
        }))()}
      </div>
    </div>
  );
};

export default TableBoard;
