import { useEffect } from 'react';
import { IUser } from '@constants/types';
import ChartBoard from './ChartBoard';
import TableBoard from './TableBoard';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

const Dashboard = ({ user }: IProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      {user.role.name !== 'user' && (
        <ChartBoard role={user.role.name} />
      )}
      <TableBoard userId={user['_id']} role={user.role.name} />
    </div>
  );
};

export default Dashboard;
