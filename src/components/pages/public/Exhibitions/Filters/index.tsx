import { Fragment, useCallback, useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getDynamicQuery } from '@utils';
import api from '@services/api';
import { TrashIcon } from '@components/icons';
import Search from '../Search';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';
import DateTool from '../DateTool';

import FilterIcon from '@assets/icons/filter-black-icon.svg';
import styles from './style.module.scss';

interface IFilterParams {
  search?: string;
  sort?: string;
}

interface ICheckboxOptions {
  _id: string;
  login: string;
  header: string;
}

interface IOptions {
  galleries: ICheckboxOptions[];
  artists: ICheckboxOptions[];
}

const AVAILABLE_ROLES = [
  'all',
  'artist',
  'gallery',
];

const Filters = () => {
  const [, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<IFilterParams | null>(null);
  const [options, setOptions] = useState<IOptions>({
    galleries: [],
    artists: [],
  });

  // available on 768px or smaller screens...
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggle = () => setIsShow(prevState => !prevState);

  const setOption = useCallback((name: string, options: string | null) => {
    const query = getDynamicQuery();

    const temp = {
      ...(query),
    };

    if (options && options.length && options !== 'null') {
      temp[name] = options;
    } else {
      if (temp.hasOwnProperty(name)) {
        delete temp[name];
      }
    }

    setFilters(temp);
  }, []);

  const apply = useCallback(() => {
    setSearchParams(filters as URLSearchParamsInit, {
      replace: true,
    });
  }, [filters]);

  const reset = useCallback(() => {
    setSearchParams({} as URLSearchParamsInit, {
      replace: true,
    });
    setFilters(null);
  }, []);

  const getOptions = useCallback(async () => {
    try {
      const { data: { users: artists } } = await api.users.getAll({
        role: 'artist',
        approved: true,
        pagination: false,
      });

      const { data: { users: galleries } } = await api.users.getAll({
        role: 'gallery',
        approved: true,
        pagination: false,
      });

      setOptions({
        artists,
        galleries,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <div className={styles.root}>
      <div onClick={toggle} className={styles.root__heading}>
        <h1 className={styles.root__heading_title}>Filters</h1>
        <img src={FilterIcon} alt="filter" className={styles.root__heading_img} />
      </div>
      <div className={classNames(styles.root__main, isShow && styles.root__main_show)}>
        <Search key={filters ? 'filters' : ''} setOption={setOption} />
        <div className={styles.root__wrapper}>
          <Fragment key={filters ? 'filters' : ''}>
            <RadioGroup name="creators" options={AVAILABLE_ROLES} setOption={setOption} />
            <CheckboxGroup name="artists" options={options.artists} setOption={setOption} />
            <CheckboxGroup name="galleries" options={options.galleries} setOption={setOption} />
            <DateTool setOption={setOption} />
          </Fragment>
          <div className={styles.root__actions}>
            <button
              type="button"
              onClick={apply}
              className={classNames(styles.root__actions_btn, styles.root__actions_apply)}
            >
              <TrashIcon fill="#fff" />
              Apply
            </button>
            <button
              type="button"
              onClick={reset}
              className={classNames(styles.root__actions_btn, styles.root__actions_reset)}
            >
              <TrashIcon fill="#000" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
