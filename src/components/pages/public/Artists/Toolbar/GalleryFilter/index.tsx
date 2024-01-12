import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { IUser } from '@constants/types';
import { getDynamicQuery } from '@utils';
import Search from '../Search';

import ArrowDown from '@assets/icons/settings/arrow-down-black.svg';
import styles from './style.module.scss';

interface IProps {
  name: string;
  galleries: IUser[];
  getActiveCounts: (count: number) => void;
}

const GalleryFilter = ({
  name,
  galleries,
  getActiveCounts,
}: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(true);
  const [values, setValues] = useState<string[]>(searchParams.get(name)?.split(',') || []);
  const [showOptions, setShowOptions] = useState<IUser[]>(galleries);

  const toggle = () => setIsShow(prevState => !prevState);
  const searchCallback = (value: string) => setSearchValue(value);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const params = getDynamicQuery();
    const temp = [...values];

    const {
      checked,
      value,
    } = e.target;

    if (checked) {
      temp.push(value);
    } else {
      const findIndex = temp.findIndex(item => item === value);
      temp.splice(findIndex, 1);
    }

    if (temp.length) {
      params[name] = temp.join(',');
    } else {
      delete params[name];
    }

    setValues(temp);
    setSearchParams(params, { replace: true });
  }, [values]);

  useEffect(() => {
    if (values.length) {
      const count = galleries.filter(gallery => values.includes(gallery['_id']))
        .map(gallery => gallery.artists).reduce((current, next) => current + next);
      getActiveCounts(count);
    }
  }, [values]);

  useEffect(() => {
    if (searchValue) {
      const search = new RegExp(searchValue.toLowerCase().replaceAll(' ', ''));

      return setShowOptions(prevState => prevState.filter(({ header }) => search.test(header.toLowerCase())));
    }

    setShowOptions(galleries);
  }, [searchValue]);

  return (
    <div className={styles.root}>
      <div className={styles.root__intro}>
        <span>Gallery</span>
        <button
          onClick={toggle}
          className={classNames(styles.root__intro_toggle, isShow && styles.root__intro_toggle_active)}
        >
          <img src={ArrowDown} alt="arrow" />
        </button>
      </div>
      {isShow && (
        <div className={styles.root__main}>
          <Search afterChange={searchCallback} />
          <ul className={styles.root__wrapper}>
            {showOptions.map(({
              _id,
              header,
              artists,
            }, index) => (
              <li key={index} className={styles.root__wrapper_item}>
                <input
                  id={`gallery${index}`}
                  type="checkbox"
                  checked={values.includes(_id)}
                  value={_id}
                  onChange={onChange}
                />
                <label htmlFor={`gallery${index}`}>
                  {header.length > 25 ? `${header.slice(0, 15)}...` : header}
                </label>
                <div
                  className={classNames(
                    styles.root__wrapper_item_counter,
                    values.includes(_id) && styles.root__wrapper_item_counter_active
                  )}
                >
                  {artists ?? 0}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GalleryFilter;
