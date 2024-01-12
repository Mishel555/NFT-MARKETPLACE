import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FeeField } from '@components/atoms';

import styles from './style.module.scss';

interface IPropTypes {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const Fixed = ({
  register,
  setValue,
}: IPropTypes) => (
  <div className={styles.root}>
    <div className={styles.root__title}>
      Fixed fee
    </div>
    <FeeField register={register} name="percents.0" setValue={setValue} /> %
  </div>
);

export default Fixed;
