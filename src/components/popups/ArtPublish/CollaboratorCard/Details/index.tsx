import { useCallback } from 'react';
import { Control, UseFormUnregister } from 'react-hook-form';
import classNames from 'classnames';
import { CollaboratorStatusType, IAuctionPublishFormValues, IFixedPublishFormValues, UserRoles } from '@constants/types';
import CommentField from '../../CommentField';
import Tools from '../Tools';
import CollaboratorFields from '../CollaboratorFields';
import LastComment from '../LastComment';

import animations from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  status: CollaboratorStatusType;
  index: number;
  role: UserRoles;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  comment?: string;
  readonly?: boolean;
  allowFeedback?: boolean;
  close: () => void;
  focusFee: () => void;
  unregisterValue: UseFormUnregister<IAuctionPublishFormValues | IFixedPublishFormValues>;
  hideFees?: boolean;
}

const Details = ({
  index,
  status,
  role,
  control,
  comment,
  readonly,
  close,
  focusFee,
  allowFeedback,
  unregisterValue,
  hideFees,
}: IProps) => {
  const edit = () => {
    focusFee();
  };

  const destroyFeedback = useCallback(() => {
    unregisterValue(`collaborators.${index}.feedback`);
  }, [index, unregisterValue]);

  return (
    <div className={classNames(styles.root, animations.born_via_height)}>
      <Tools disableClose={allowFeedback} readonly={readonly} edit={edit} close={close} />
      <CollaboratorFields
        index={index}
        status={status}
        role={role}
        control={control}
        isEditable={false}
        hideFees={hideFees}
      />
      {!!comment && (
        <LastComment comment={comment} reject={status === 'declined'} />
      )}
      {allowFeedback && (
        <CommentField
          name={`collaborators.${index}.feedback`}
          control={control}
          destroyValue={destroyFeedback}
        />
      )}
    </div>
  );
};

export default Details;
