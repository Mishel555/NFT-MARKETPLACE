import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  active: number;
  tabs: string[];
  changeTab: (index: number) => void;
}

const TabSelector = ({
  tabs,
  active,
  changeTab,
}: IProps) => (
  <div className={styles.root}>
    {tabs.map((tab, index) => (
      <button
        key={tab}
        onClick={() => changeTab(index)}
        className={classNames(styles.root__btn, active === index && styles.root__btn_active)}
      >
        <span>{tab}</span>
      </button>
    ))}
  </div>
);

export default TabSelector;
