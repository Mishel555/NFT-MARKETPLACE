import { Control } from 'react-hook-form';
import { IAuctionPublishFormValues, IFixedPublishFormValues } from '@constants/types';
import NumberInput from './NumberInput';
import styles from './style.module.scss';

interface IProps {
  label: string;
  name: keyof IFixedPublishFormValues | keyof IAuctionPublishFormValues;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  availableValue: number;
  readonly?: boolean;
}

const FormField = ({
  availableValue,
  name,
  label,
  control,
  readonly,
}: IProps) => (
  <div className={styles.root}>
    <h4 className={styles.root__title}>{label}</h4>
    <div className={styles.root__wrapper}>
      <div className={styles.root__input}>
        <NumberInput
          name={name}
          control={control}
          availableValue={availableValue}
          readonly={readonly}
        />
      </div>
    </div>
  </div>
);

export default FormField;
