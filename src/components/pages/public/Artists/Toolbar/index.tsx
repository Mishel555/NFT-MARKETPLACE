import { IUser } from '@constants/types';
import Filters from './Filters';
import Sort from './Sort';

import styles from './style.module.scss';

interface IProps {
  sortOptions: {
    label: string;
    value: string;
  }[];
  galleries: IUser[];
}

const Toolbar = ({
  galleries,
  sortOptions,
}: IProps) => (
  <div className={styles.root}>
    <Filters galleries={galleries} sortOptions={sortOptions} />
    <Sort name="sort" params={sortOptions} />
  </div>
);

export default Toolbar;
