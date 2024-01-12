import { Fragment, useEffect, useRef, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import classNames from 'classnames';
import { FeeField } from '@components/atoms';

import DownArrow from '@assets/icons/arrow-down-purple.svg';
import styles from './style.module.scss';

interface IPropTypes {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  count: number;
}

const EditableMultipleFee = ({
  register,
  watch,
  setValue,
  count,
}: IPropTypes) => {
  const amounts = watch('amounts');

  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggle = (): void => setIsOpen(!isOpen);

  useEffect(() => {
    if (amounts?.length) {
      const index = amounts?.findIndex((amount: number) => isNaN(amount));

      if (index > -1) {
        setValue(`amounts.${index}`, (amounts && amounts[index - 1]) ? amounts[index - 1] + 2 : 1);
      }
    }
  });

  return (
    <div ref={boxRef} className={styles.root}>
      <button className={classNames(styles.root__header, isOpen && styles.root__header_active)} onClick={toggle}>
        <span>
          {count > 2 ? 'Three' : 'Two'}-step limit FEE
        </span>
        <img alt="arrow" src={DownArrow} />
      </button>
      {isOpen && (
        <div className={styles.root__wrapper}>
          <div>
            <span className={styles.root__wrapper_title}>
              Amount limit
            </span>
            <ul>
              <li className={styles.root__amount}>
                0 - &nbsp;
                <FeeField register={register} name="amounts.1" setValue={setValue} /> $
              </li>
              {count > 2 ? (
                <Fragment>
                  <li className={styles.root__amount}>
                    {amounts && !isNaN(amounts[1]) ? amounts[1] + 1 : 2} - &nbsp;
                    <FeeField
                      value={amounts && !isNaN(amounts[1]) ? amounts[1] + 2 : 3}
                      register={register}
                      name="amounts.2"
                      setValue={setValue}
                      minValue={amounts && !isNaN(amounts[1]) ? amounts[1] + 2 : 3}
                    /> $
                  </li>
                  <li className={styles.root__amount}>
                    {amounts && !isNaN(amounts[2]) ? amounts[2] + 1 : 4} - <p className={styles.root__infinity}>∞</p>
                  </li>
                </Fragment>
              ) : (
                <li className={styles.root__amount}>
                  {amounts && !isNaN(amounts[1]) ? amounts[1] + 1 : 2} - <p className={styles.root__infinity}>∞</p>
                </li>
              )}
            </ul>
          </div>
          <div className={styles.root__percentage}>
            <span className={styles.root__wrapper_title}>
              Percentage
            </span>
            <ul>
              <li className={styles.root__amount}>
                <FeeField
                  register={register}
                  name="percents.0"
                  setValue={setValue}
                /> %
              </li>
              <li className={styles.root__amount}>
                <FeeField
                  register={register}
                  name="percents.1"
                  setValue={setValue}
                /> %
              </li>
              {count > 2 && (
                <li className={styles.root__amount}>
                  <FeeField
                    register={register}
                    name="percents.2"
                    setValue={setValue}
                  /> %
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableMultipleFee;
