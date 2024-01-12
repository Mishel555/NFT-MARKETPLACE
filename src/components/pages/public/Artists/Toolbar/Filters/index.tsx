import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { IUser } from '@constants/types';
import GalleryFilter from '../GalleryFilter';
import SearchBar from '../SearchBar';
import SortFilter from '../SortFilter';
import Clear from '../Clear';

import FilterIcon from '@assets/icons/filter-icon.svg';
import ArrowDown from '@assets/icons/settings/arrow-down-black.svg';
import styles from './style.module.scss';

interface IProps {
  sortOptions: {
    label: string;
    value: string;
  }[];
  galleries: IUser[];
}

const Filters = ({
  sortOptions,
  galleries,
}: IProps) => {
  const isActive = useSearchParams()[0].get('gallery');

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [galleryActiveCounts, setGalleryActiveCounts] = useState<number | null>(null);

  const toggle = () => setIsShow(prevState => !prevState);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      setIsShow(false);
    }
  }, []);

  const afterReset = () => {
    setIsShow(false);
    setGalleryActiveCounts(null);
  };

  const getActiveCounts = (count: number): void => {
    setGalleryActiveCounts(count);
  };

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.root__main}>
        <button
          onClick={toggle}
          className={classNames(styles.root__btn, (isActive || isShow) && styles.root__btn_active)}
        >
          <div className={styles.root__btn_group}>
            <img src={FilterIcon} alt="filter" />
            <span>Filter</span>
          </div>
          <div className={styles.root__btn_group}>
            {galleryActiveCounts !== null && (
              <div className={styles.root__btn_group_counter}>
                {galleryActiveCounts}
              </div>
            )}
            <img className={styles.root__btn_toggleIcon} src={ArrowDown} alt="arrow" />
          </div>
        </button>
        <div className={styles.root__main_search}>
          <SearchBar />
        </div>
        <Clear cb={afterReset} />
      </div>
      {isShow && (
        <div key={String(isShow)} className={styles.root__wrapper}>
          <div className={styles.root__wrapper_search}>
            <SearchBar />
          </div>
          <GalleryFilter name="gallery" galleries={galleries} getActiveCounts={getActiveCounts} />
          <div className={styles.root__wrapper_sort}>
            <SortFilter name="sort" params={sortOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
