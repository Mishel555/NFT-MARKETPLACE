import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  views: string[];
  selectedView: number;
  changeViewMode: (index: number) => void;
}

const ViewSelector = ({
  views,
  selectedView,
  changeViewMode,
}: IProps) => (
  <ul className={styles.root}>
    {views.map((name, index) => (
      <li
        key={index}
        onClick={() => changeViewMode(index)}
        className={classNames(styles.root__item, selectedView === index && styles.root__item_active)}
      >
        {name}
      </li>
    ))}
  </ul>
);

export default ViewSelector;
