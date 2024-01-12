import { ChangeEvent } from 'react';
import classNames from 'classnames';

import styles from './style.module.scss';

interface IProps {
  id: string;
  highlight: boolean;
  defaultChecked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ id, defaultChecked, highlight, onChange }: IProps) => (
  <div className={styles.root}>
    <input
      id={id}
      type="checkbox"
      className={styles.root__input}
      defaultChecked={defaultChecked}
      onChange={onChange}
    />
    <label htmlFor={id} className={classNames(styles.root__label, highlight && styles.root__highlight)} />
  </div>
);

export default Checkbox;
