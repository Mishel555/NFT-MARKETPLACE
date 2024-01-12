import { useState } from 'react';
import { MembershipType } from '@constants/types';
import Toolbar from '../Toolbar';
import List from '../List';

import styles from './style.module.scss';

const TABS: MembershipType[] = ['none', 'Standard Membership', 'Platinum Membership'];

interface IProps {
  types: string[];
  data: {[key in MembershipType]: {
    available: 'yes' | 'no' | 'paid';
    feature?: string;
  }[]};
}

const Mobile = ({ types, data }: IProps) => {
  const [tab, setTab] = useState<MembershipType>('none');

  const changeTab = (newTab: MembershipType) => {
    if (newTab !== tab) {
      setTab(newTab);
    }
  };

  return (
    <div className={styles.root}>
      <Toolbar types={TABS} active={tab} onChange={changeTab} />
      <List tab={tab} types={types} data={data} />
    </div>
  );
};

export default Mobile;
