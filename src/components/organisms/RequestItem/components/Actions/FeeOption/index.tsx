import classNames from 'classnames';

import styles from './style.module.scss';

interface IPropTypes {
  id: number;
  title: string;
  description: string;
  selectedOption: number;
  selectOption: (option: number) => void;
}

const FeeOption = ({
  id,
  title,
  description,
  selectedOption,
  selectOption,
}: IPropTypes) => (
  <div
    className={classNames(styles.root, selectedOption === id ? styles.root_active : styles.root_inactive)}
    onClick={() => selectOption(id)}
  >
    <div className={styles.root__inner}>
      <p className={styles.root__title}>
        {title}
      </p>
      <p className={styles.root__text}>
        {description}
      </p>
    </div>
  </div>
);

export default FeeOption;
