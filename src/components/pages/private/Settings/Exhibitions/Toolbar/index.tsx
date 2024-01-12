import Search from '../Search';
import Sort from '../Sort';

import styles from './style.module.scss';

interface IProps {
  availableCreate: boolean;
  create: () => void;
}

const SORT_PARAMS = [
  {
    label: 'Newest',
    value: '-updatedAt',
  },
  {
    label: 'Oldest',
    value: 'updatedAt',
  },
];

const Toolbar = ({
  availableCreate,
  create,
}: IProps) => (
  <div className={styles.root}>
    <button disabled={!availableCreate} onClick={create} className={styles.root__btn}>
      Add new
    </button>
    <div className={styles.root__form}>
      <Search />
      <Sort name="sort" params={SORT_PARAMS} />
    </div>
  </div>
);

export default Toolbar;
