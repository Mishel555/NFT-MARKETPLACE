import { ChangeEvent, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getDynamicQuery } from '@utils';

import ArrowDown from '@assets/icons/settings/arrow-down-black.svg';
import styles from './style.module.scss';

interface IProps {
  name: string;
  params: {
    label: string;
    value: string;
  }[];
}

const SortFilter = ({
  name,
  params,
}: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isShow, setIsShow] = useState<boolean>(true);
  const [selectedValue, setSelectedValue] = useState<string>(searchParams.get(name) || '');

  const toggle = () => setIsShow(prevState => !prevState);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const params = getDynamicQuery();
    let temp = selectedValue;

    const {
      checked,
      value,
    } = e.target;

    if (checked) {
      temp = value;
    }

    if (temp.length) {
      params[name] = temp;
    } else {
      delete params[name];
    }

    setSelectedValue(temp);
    setSearchParams(params, { replace: true });
  }, [selectedValue]);

  return (
    <div className={styles.root}>
      <div className={styles.root__intro}>
        <span>Sort by</span>
        <button
          onClick={toggle}
          className={classNames(styles.root__intro_toggle, isShow && styles.root__intro_toggle_active)}
        >
          <img src={ArrowDown} alt="arrow" />
        </button>
      </div>
      {isShow && (
        <ul className={styles.root__wrapper}>
          {params.map(({
            label,
            value,
          }, index) => (
            <li key={index} className={styles.root__wrapper__item}>
              <input
                type="radio"
                id={`sort${index}`}
                value={value}
                checked={value === selectedValue}
                onChange={onChange}
              />
              <label htmlFor={`sort${index}`}>{label}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortFilter;
