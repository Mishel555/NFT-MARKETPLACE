import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import FilterIcon from '@assets/icons/filter-icon-small.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './styles.module.scss';

interface IProps {
  options: string[];
  currentOption: string;
  selectOption: (option: string) => void;
}

const ShowRoomSort = ({
  options,
  currentOption,
  selectOption,
}: IProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const select = useCallback((option: string) => {
    selectOption(option);
    setShowMenu(false);
  }, [selectOption]);

  const listener = useCallback((e: MouseEvent) => {
    if (!boxRef.current?.contains(e.target as Element)) {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div className={styles.root} ref={boxRef}>
      <button onClick={toggle}>
        <img src={FilterIcon} alt="filter" />
        {(() => {
          switch (currentOption) {
            case 'updatedAt':
              return 'Newest';
            case '-updatedAt':
              return 'Oldest';
            case 'price':
              return 'Price: Highest';
            case '-price':
              return 'Price: Lowest';
            default:
              return 'Apply filter';
          }
        })()}
      </button>
      {showMenu && (
        <ul className={classNames(styles.root__wrapper, showMenu && animatedStyles.born_via_fade)}>
          {options.map((option, index) => option !== currentOption && (
            <li key={index} onClick={() => select(option)} className={styles.root__wrapper_item}>
              {(() => {
                switch (option) {
                  case 'updatedAt':
                    return 'Newest';
                  case '-updatedAt':
                    return 'Oldest';
                  case 'price':
                    return 'Price: Highest';
                  case '-price':
                    return 'Price: Lowest';
                }
              })()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowRoomSort;
