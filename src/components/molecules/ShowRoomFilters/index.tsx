import classNames from 'classnames';

import styles from './style.module.scss';

interface IProps {
  filters: string[];
  currentFilter: string;
  changeFilter: (filter: string) => void;
}

const DATA: { [key: string]: string } = {
  'processed': 'Created',
  'published': 'On Sale',
  'sold out': 'Owned',
  'inMyReview': 'Collaboration',
  'galleryDefault': 'other',
  'onGalleryApproval': 'To Approve',
};

const ShowRoomFilters = ({
  filters,
  changeFilter,
  currentFilter,
}: IProps) => (
  <ul className={styles.root}>
    {filters.map((type, index) => (
      <li
        key={index}
        className={classNames(styles.root__item, currentFilter === type && styles.root__item_active)}
        onClick={() => changeFilter(type)}
      >
        {DATA[type] ?? type}
      </li>
    ))}
  </ul>
);

export default ShowRoomFilters;
