import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import DoneIcon from '@assets/icons/done-grey-icon.svg';
import SortIcon from '@assets/icons/sort-black-icon.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  setOption: (name: string, options: string | null) => void;
}

const OPTIONS: string[] = [
  '-publishedAt',
  'price',
  '-price',
  'publishedAt',
];

const SortTool = ({ setOption }: IProps) => {
  const [searchParams, setSearchParam] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<string | null>(searchParams.get('sort'));
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    if(!searchParams.get('sort')){
      searchParams.set('sort', '-publishedAt');
      setSearchParam(searchParams.toString());
    }
  }, []);

  const selectOption = useCallback((option: string) => {
    toggle();
    if (option !== selectedOption) {
      setSelectedOption(option);
    }
  }, [selectedOption]);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      setIsOpened(false);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('sort') !== selectedOption) {
      setOption('sort', selectedOption);
    }
  }, [selectedOption]);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button className={styles.root__btn} onClick={toggle}>
        <img src={SortIcon} alt="sort" />
        Sort By
      </button>
      {isOpened && (
        <ul className={classNames(styles.root__wrapper, isOpened && animatedStyles.born_via_fade)}>
          {OPTIONS.map((option, index) => (
            <li
              key={index}
              onClick={() => selectOption(option)}
              className={classNames(styles.root__wrapper_item, selectedOption === option && styles.root__wrapper_item_active)}
            >
              {selectedOption === option && (
                <img width={12} src={DoneIcon} alt="selected" />
              )}
              {(() => {
                switch (option) {
                  case '-publishedAt':
                    return 'Newest';
                  case 'publishedAt':
                    return 'Oldest';
                  case 'price':
                    return 'Price: Lowest';
                  case '-price':
                    return 'Price: Highest';
                }
              })()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortTool;
