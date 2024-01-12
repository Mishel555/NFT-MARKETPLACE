import { Control, UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';
import { IAuctionPublishFormValues, IFixedPublishFormValues, UserRoles } from '@constants/types';
import CollaboratorFeeField from '../../CollaboratorFeeField';
import UsernameField from '../../UsernameField';
import CollaboratorStatusSection from '../../CollaboratorStatusSection';
import styles from './style.module.scss';

interface IProps {
  index: number;
  availableValue: number;
  getValue: UseFormWatch<IFixedPublishFormValues | IAuctionPublishFormValues>;
  setValue: UseFormSetValue<IFixedPublishFormValues | IAuctionPublishFormValues>;
  unregister: UseFormUnregister<IFixedPublishFormValues | IAuctionPublishFormValues>;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  errorMessage?: string;
  role?: UserRoles | null;
}

const FormFields = ({ index, availableValue, setValue, getValue, unregister, role, errorMessage, control }: IProps) => (
  <div className={styles.root}>
    <UsernameField
      index={index}
      role={role}
      getValue={getValue}
      setValue={setValue}
      unregister={unregister}
      errorMessage={errorMessage}
    />
    <CollaboratorFeeField
      availableValue={availableValue}
      name={`collaborators.${index}.fee` as keyof IFixedPublishFormValues}
      label="Fees %*"
      control={control as Control<IFixedPublishFormValues | IAuctionPublishFormValues>}
    />
    <CollaboratorStatusSection />
  </div>
);

export default FormFields;
