import { useEffect, useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import classNames from 'classnames';
import api from '@services/api';
import { ITypes } from '@constants/types';

import ArrowDownIcon from '@assets/icons/arrow-down.svg';

import styles from './style.module.scss';

interface IPropTypes {
  control: Control;
  setValue: (name: string, value: string) => void;
}

const TypeBox = ({
  control,
  setValue,
}: IPropTypes) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isHide, setIsHide] = useState<boolean>(true);
  const [types, setTypes] = useState<ITypes[]>([]);
  const [selectedType, setSelectedType] = useState<ITypes | null>(null);

  const selectType = (type: ITypes): void => {
    setSelectedType(type);
    setValue('type', type['_id']);
    setIsHide(true);
  };

  useEffect(() => {
    let mounted = true;

    const listener = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Element)) {
        setIsHide(true);
      }
    };

    api.types.getAll().then(({ data }) => mounted && setTypes(data.filter((type: ITypes) => !type.special)));

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
      mounted = false;
    };
  }, []);

  return (
    <Controller
      name="type"
      control={control}
      render={({ fieldState: { error } }) => (
        <div className={styles.root} ref={boxRef}>
          <p className={styles.root__label}>Type of Art</p>
          <div className={styles.root__select}>
            <div className={styles.root__selected} onClick={() => setIsHide(!isHide)}>
              <span>
                {selectedType ? selectedType.name : 'Choose'}
              </span>
              <button
                type="button"
                className={classNames(styles.root__select_btn, !isHide && styles.root__select_active)}
              >
                <img src={ArrowDownIcon} alt="" />
              </button>
            </div>
            {isHide ? null : (
              <ul className={styles.root__list}>
                {types?.map((type) => (
                  <li key={type['_id']} onClick={() => selectType(type)}>
                    {type.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {error && (
            <span className={styles.root__error}>{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default TypeBox;
