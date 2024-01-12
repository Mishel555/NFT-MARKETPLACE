import { Fragment, useMemo } from 'react';
import { UseFormSetValue, Control, UseFormUnregister, UseFormWatch, FieldErrors } from 'react-hook-form';
import { IAuctionPublishFormValues, ICollaborator, IFixedPublishFormValues } from '@constants/types';
import Toolbar from '../Toolbar';
import CollaboratorForm from '../CollaboratorForm';
import CollaboratorCard from '../CollaboratorCard';
import styles from './style.module.scss';
import { useAuth } from '@hooks';

interface IProps {
  creator: string;
  allowAdd: boolean;
  allowFeedback: boolean;
  errors?: FieldErrors;
  collaboratorsObj: ICollaborator[];
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  watch: UseFormWatch<IFixedPublishFormValues | IAuctionPublishFormValues>;
  setValue: UseFormSetValue<IFixedPublishFormValues | IAuctionPublishFormValues>;
  unregister: UseFormUnregister<IFixedPublishFormValues | IAuctionPublishFormValues>;
  readonly?: boolean;
  resell?: boolean;
}

const Collaborators = ({
  creator,
  allowAdd,
  allowFeedback,
  errors,
  control,
  collaboratorsObj,
  readonly,
  watch,
  setValue,
  unregister,
}: IProps) => {
  const { user } = useAuth();

  const collaborators = watch('collaborators');
  const lastCollaborator = collaborators[collaborators.length - 1];
  const lastCollaboratorFilled = !!lastCollaborator?.username && !!lastCollaborator?.fee !== undefined;
  const availableFee = 100 - collaborators?.reduce((acc, item) => acc + +item.fee, 0);

  const hideFees = useMemo<boolean>(() => {
    if (!user) return true;

    if (user.role.name === 'admin') return false;

    return user['_id'] !== creator;
  }, [user, creator]);

  const addCollaborator = () => {
    setValue(`collaborators.${collaborators.length}`, {
      id: '',
      fee: 0,
      username: '',
      key: `collaborator-${collaborators.length}`,
    });
  };

  const deleteCollaborator = (index: number) => {
    const temp = [...collaborators];
    temp.splice(index, 1);

    setValue('collaborators', temp);
  };

  return (
    <Fragment>
      {!collaborators.length && <Toolbar disabled={!allowAdd} add={addCollaborator} />}
      {!!collaborators.length && (
        <div className={styles.root}>
          <h1 className={styles.root__title}>Collaborators</h1>
          {!hideFees && (
            <h3 className={styles.root__fee}>Total % to share is {availableFee}%</h3>
          )}
          <div className={styles.root__wrapper}>
            {collaborators.map(({ key }, index) => readonly ? (
              <CollaboratorCard
                key={key}
                readonly
                allowFeedback={allowFeedback}
                index={index}
                control={control}
                collaboratorsObj={collaboratorsObj}
                setFocus={() => {
                }}
                unregister={unregister}
                watch={watch}
                creator={creator}
              />
            ) : (
              <CollaboratorForm
                key={key}
                index={index}
                control={control}
                setValue={setValue}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                usernameMessage={errors?.collaborators && errors.collaborators[index]?.username}
                getValue={watch}
                unregister={unregister}
                availableValue={availableFee}
                deleteCollaborator={deleteCollaborator}
              />
            ))}
            {!readonly && collaborators.length < 9 && lastCollaboratorFilled && (
              <button onClick={addCollaborator} type="button" className={styles.root__add}>
                Add more collaborations ({9 - collaborators.length})
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Collaborators;
