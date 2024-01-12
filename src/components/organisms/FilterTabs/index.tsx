import classNames from 'classnames';
import { ArtStatusType, RequestStatusType } from '@constants/types';
import { StatusBadge } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  filters: ArtStatusType[] | RequestStatusType[];
  currentFilter: string | null;
  setFilter: (filter: string) => void;
}

const FilterTabs = ({ filters, currentFilter, setFilter }: IProps) => (
  <div className={styles.root}>
    {filters.map((type, index) => (
      <button
        key={index}
        className={classNames(styles.root__btn, currentFilter === type && styles.root__btn_active)}
        onClick={() => setFilter(type)}
      >
        <StatusBadge type={type} />
      </button>
    ))}
  </div>
);

export default FilterTabs;
