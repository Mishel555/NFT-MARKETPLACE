import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getDynamicQuery } from '@utils';

import SortIcon from '@assets/icons/sort-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  name: string;
  params: {
    label: string;
    value: string;
  }[];
}

const Sort = ({
  name,
  params,
}: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOption = searchParams.get(name);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [option, setOption] = useState<string | null>(initialOption);
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggle = useCallback(() => setIsShow(prevState => !prevState), []);

  const selectOption = useCallback((option: string) => {
    const query = getDynamicQuery();

    const temp = {
      ...(query),
      ...(option && { [name]: option }),
    };

    if (!option) {
      delete temp[name];
    }

    setOption(option);
    setIsShow(false);
    setSearchParams(temp, { replace: true });
  }, [name, setSearchParams]);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      setIsShow(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button onClick={toggle} className={styles.root__btn}>
        <img src={SortIcon} alt="sort" />
        Sort by
      </button>
      {isShow && (
        <ul className={styles.root__list}>
          {params.map(({
            label,
            value,
          }, index) => (
            <li
              key={index}
              onClick={() => selectOption(value)}
              className={classNames(styles.root__list_item, option === value && styles.root__list_active)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sort;
