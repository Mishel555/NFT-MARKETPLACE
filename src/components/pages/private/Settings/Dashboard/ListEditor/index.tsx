import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { INameValue } from '@constants/types';
import { useDebounce } from '@hooks';
import { objectEquals } from '@utils';
import classNames from 'classnames';
import { CaretArrowIcon, TrashIcon } from '@components/icons';

import SearchIcon from '@assets/icons/search-grey-icon.svg';
import animatedStyles from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  name: string;
  items: INameValue[];
  defaultItems: string[] | null;
  applyItems: (values: string[]) => void;
}

const ListEditor = ({
  name,
  items,
  defaultItems,
  applyItems,
}: IProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [availableItems, setAvailableItems] = useState<INameValue[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const debouncedValue = useDebounce(searchValue, 500);

  const toggle = useCallback(() => setIsShow(prevState => !prevState), []);

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;

    const foundedItem = selectedItems.findIndex(item => item === id);

    if (foundedItem > -1) {
      return setSelectedItems(prevState => prevState.filter(item => item !== id));
    }

    setSelectedItems(prevState => [...prevState, id]);
  }, [selectedItems]);

  const sendItems = useCallback(() => {
    applyItems(selectedItems);
    setIsShow(false);
  }, [selectedItems, applyItems]);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      setIsShow(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [listener]);

  useEffect(() => {
    if (debouncedValue) {
      const search = new RegExp(debouncedValue.toLowerCase());
      setAvailableItems(items.filter(({ name }) => search.test(name.toLowerCase())));
      return;
    }

    if (!objectEquals(items, availableItems)) {
      setAvailableItems(items);
    }
  }, [items, availableItems, debouncedValue]);

  useEffect(() => {
    if (defaultItems) {
      setSelectedItems(defaultItems);
    }
  }, [defaultItems]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button onClick={toggle} className={classNames(styles.root__btn, isShow && styles.root__btn_active)}>
        <span>Edit list</span>
        <CaretArrowIcon fill="black" />
      </button>
      {isShow && (
        <div className={classNames(styles.root__wrapper, isShow && animatedStyles.born_via_fade)}>
          <h1 className={styles.root__title}>
            Select {name} to view
          </h1>
          <span className={styles.root__desc}>Up to 10 {name} are allowed</span>
          <div className={styles.root__search}>
            <input type="text" onChange={onSearch} placeholder="Search by name" className={styles.root__search_input} />
            <img src={SearchIcon} alt="Search" className={styles.root__search_icon} />
          </div>
          <ul className={styles.root__list}>
            {availableItems.map(({
              name,
              value,
            }) => (
              <li key={value} className={styles.root__list_item}>
                <input
                  id={`${value}`}
                  type="checkbox"
                  defaultChecked={selectedItems.includes(value)}
                  onChange={onChange}
                />
                <label htmlFor={`${value}`}>{name}</label>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={sendItems}
            disabled={selectedItems.length > 10}
            className={styles.root__apply}
          >
            <TrashIcon fill="#000" />
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default ListEditor;
