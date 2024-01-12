import { useEffect, useState, useCallback } from 'react';
import { ITypes } from '@constants/types';
import api from '@services/api';

import ArrowDownIconLight from '@assets/icons/arrow-down-light.svg';
import styles from '../style.module.scss';

interface IPropTypes {
  selectedType: ITypes | null;
  setValue: (name: string, value: string) => void;
}

const Type = ({
  selectedType,
  setValue,
}: IPropTypes) => {
  const [isHide, setIsHide] = useState<boolean>(true);
  const [types, setTypes] = useState<ITypes[]>();
  const [type, setType] = useState<ITypes | null>(null);

  const selectType = useCallback((type: ITypes): void => {
    setType(type);
    setValue('type', type['_id']);
    setIsHide(true);
  }, [setValue]);

  useEffect(() => {
    if (selectedType) {
      selectType(selectedType);
    }
  }, [selectType, selectedType]);

  useEffect(() => {
    let mounted = true;

    api.types.getAll().then(({ data }) => mounted && setTypes(data.filter((type: ITypes) => !type.special)));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.form__group_inner}>
      <label className={styles.form__group_label}>
        Type of Art
      </label>
      <div className={styles.form__group_select} onClick={() => setIsHide(!isHide)}>
        <div className={styles.form__group_selected}>
          <span>
            {type?.name || 'Choose'}
          </span>
          <img src={ArrowDownIconLight} alt="" />
        </div>
        {!isHide ? (
          <ul className={styles.form__group_list}>
            {types?.map(({
              _id,
              name,
              __v,
            }, index) => (
              <li
                key={index}
                onClick={() => selectType({
                  _id,
                  name,
                  __v,
                })}
              >
                {name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Type;
