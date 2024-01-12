import { ChangeEvent } from 'react';
import styles from './style.module.scss';

interface IProps {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChange }: IProps) => (
  <input
    type="number"
    value={value}
    onChange={onChange}
    className={styles.root}
  />
);

export default Input;
