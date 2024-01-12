import { ReactElement } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  tabs: {
    label: string;
    icon: ReactElement;
  }[];
  activeTab: number;
  onChange: (index: number) => void;
}

const Tabs = ({
  tabs,
  activeTab,
  onChange,
}: IProps) => (
  <div className={styles.root}>
    {tabs.map(({
      label,
      icon,
    }, index) => (
      <button
        key={label}
        onClick={() => onChange(index)}
        className={classNames(styles.root__btn, activeTab === index && styles.root__btn_active)}
      >
        {icon}
        <span className={styles.root__btn_text}>{label}</span>
      </button>
    ))}
  </div>
);

export default Tabs;
