import { Control } from 'react-hook-form';
import { IAuctionPublishFormValues, IFixedPublishFormValues } from '@constants/types';
import TextInput from '../TextInput';
import NumberInput from '../NumberInput';
import styles from './style.module.scss';

interface IProps {
  label: string;
  type: 'text' | 'number';
  name: keyof IFixedPublishFormValues | keyof IAuctionPublishFormValues;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
  inputClassName?: string;
}

const FormField = ({
  min,
  max,
  step,
  name,
  type,
  label,
  control,
  readonly,
  inputClassName,
}: IProps) => (
  <div className={styles.root}>
    <h4 className={styles.root__title}>{label}</h4>
    <div className={styles.root__wrapper}>
      <div className={styles.root__input}>
        {type === 'number' ? (
          <NumberInput name={name} control={control} min={min} max={max} step={step} readonly={readonly} />
        ) : (
          <TextInput name={name} control={control} inputClassName={inputClassName} />
        )}
      </div>
    </div>
  </div>
);

export default FormField;
