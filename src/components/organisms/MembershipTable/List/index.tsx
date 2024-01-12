import { useMemo } from 'react';
import { MembershipType } from '@constants/types';
import MemberItem from '../MemberItem';
import styles from './style.module.scss';

interface IProps {
  types: string[];
  tab: MembershipType;
  data: {
    [key in MembershipType]: {
      available: 'yes' | 'no' | 'paid';
      feature?: string;
    }[]
  };
}

const List = ({ tab, types, data }: IProps) => {
  const benefits = useMemo(() => data[tab], [tab, data]);

  return (
    <ul className={styles.root}>
      {types.map((type, index) => (
        <li key={type} className={styles.root__item}>
          <p className={styles.root__title}>{type}</p>
          <MemberItem available={benefits[index].available} feature={benefits[index].feature} />
        </li>
      ))}
    </ul>
  );
};

export default List;
