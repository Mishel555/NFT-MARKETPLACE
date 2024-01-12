import Search from './Search';
import Sort from './Sort';

import styles from './style.module.scss';

interface IProps {
  options: {
    label: string;
    value: string;
  }[];
}

const ExploreToolBar = ({ options }: IProps) => (
  <div className={styles.root}>
    <Search />
    <Sort name="sort" params={options} />
  </div>
);

export default ExploreToolBar;
