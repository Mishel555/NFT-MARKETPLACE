import { Control } from 'react-hook-form';
import { CollaboratorStatusType, IAuctionPublishFormValues, IFixedPublishFormValues, UserRoles } from '@constants/types';
import { CollaboratorStatusBadge, UserBadge } from '@components/atoms';
import TextInput from '../../TextInput';
import NumberInput from '../../NumberInput';
import styles from './style.module.scss';

interface IProps {
  index: number;
  status: CollaboratorStatusType;
  role: UserRoles;
  isEditable: boolean;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  hideFees?: boolean;
}

const CollaboratorFields = ({ index, status, role, hideFees, isEditable, control }: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__group}>
      <p className={styles.root__group_label}>Username*</p>
      <TextInput
        readonly
        name={`collaborators.${index}.username` as keyof IFixedPublishFormValues}
        control={control}
      />
    </div>
    <div className={styles.root__group}>
      <p className={styles.root__group_label}>Fees %*</p>
      <NumberInput
        readonly={!isEditable}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name={hideFees ? '_____' : `collaborators.${index}.fee` as keyof IFixedPublishFormValues}
        control={control}
        inputClassName={styles.root__group_feeInput}
        messageClassName={styles.root__group_feeMessage}
      />
    </div>
    <div className={styles.root__group}>
      <p className={styles.root__group_label}>Roles*</p>
      <UserBadge role={role} className={styles.root__group_roleBadge} />
    </div>
    <div className={styles.root__group}>
      <p className={styles.root__group_label}>Status</p>
      <CollaboratorStatusBadge status={status} />
    </div>
  </div>
);

export default CollaboratorFields;
