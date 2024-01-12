import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IUser } from '@constants/types';
import TabSelector from './TabSelector';
import Setup from './Setup';
import Messages from './Messages';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
}

const TABS: string[] = ['Set Up notifications', 'Show notifications'];

const Notifications = ({}: IProps) => {
  const [search] = useSearchParams();
  const show = search.get('show');

  const [tab, setTab] = useState(show ? 1 : 0);

  const selectTab = (index: number) => setTab(index);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <TabSelector active={tab} tabs={TABS} changeTab={selectTab} />
      <div className={styles.root__content}>
        {tab === 0 ? <Setup /> : <Messages />}
      </div>
    </div>
  );
};

export default Notifications;
