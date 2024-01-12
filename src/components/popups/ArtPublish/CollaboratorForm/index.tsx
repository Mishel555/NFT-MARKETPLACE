import { Fragment } from 'react';
import { Control, FieldError, UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form';
import { IAuctionPublishFormValues, IFixedPublishFormValues, UserRoles } from '@constants/types';
import CommentField from '../CommentField';

import RoleSelector from '../RoleSelector';
import Toolbar from './Toolbar';
import FormFields from './FormFields';

import styles from './style.module.scss';

interface IProps {
  index: number;
  availableValue: number;
  usernameMessage?: FieldError;
  getValue: UseFormWatch<IFixedPublishFormValues | IAuctionPublishFormValues>;
  setValue: UseFormSetValue<IFixedPublishFormValues | IAuctionPublishFormValues>;
  unregister: UseFormUnregister<IFixedPublishFormValues | IAuctionPublishFormValues>;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  deleteCollaborator: (index: number) => void;
}

const CollaboratorForm = ({
  index,
  availableValue,
  control,
  usernameMessage,
  deleteCollaborator,
  setValue,
  getValue,
  unregister,
}: IProps) => {
  const role = getValue(`collaborators.${index}.role`);
  const username = getValue(`collaborators.${index}.username`);

  const onRoleSelect = (role: UserRoles) => setValue(`collaborators.${index}.role`, role);

  const removeRole = () => setValue(`collaborators.${index}.role`, undefined);

  const destroyComment = () => {
    unregister(`collaborators.${index}.comment`);
  };

  return (
    <div className={styles.root}>
      <Toolbar index={index} username={username} deleteCollaborator={deleteCollaborator} />
      <RoleSelector currentRole={role} onChange={onRoleSelect} onRemove={removeRole} />
      {!!role && (
        <Fragment>
          <FormFields
            index={index}
            control={control}
            role={role}
            errorMessage={usernameMessage?.message}
            availableValue={availableValue}
            setValue={setValue}
            getValue={getValue}
            unregister={unregister}
          />
          <CommentField
            allowSwitch
            name={`collaborators.${index}.comment`}
            control={control as Control<IFixedPublishFormValues | IAuctionPublishFormValues>}
            destroyValue={destroyComment}
          />
        </Fragment>
      )}
    </div>
  );
};

export default CollaboratorForm;
