import { useEffect, useMemo, useState } from 'react';
import { Control, UseFormSetFocus, UseFormUnregister, UseFormWatch } from 'react-hook-form';
import { IAuctionPublishFormValues, ICollaborator, IFixedPublishFormValues, UserRoles } from '@constants/types';
import { getCollaborationStatus } from '@utils';
import { useAuth } from '@hooks';
import api from '@services/api';
import Preview from './Preview';
import Details from './Details';

import styles from './style.module.scss';

interface IProps {
  index: number;
  creator: string;
  allowFeedback: boolean;
  collaboratorsObj: ICollaborator[];
  control: Control<IAuctionPublishFormValues | IFixedPublishFormValues>;
  setFocus: UseFormSetFocus<IAuctionPublishFormValues | IFixedPublishFormValues>;
  watch: UseFormWatch<IAuctionPublishFormValues | IFixedPublishFormValues>;
  unregister: UseFormUnregister<IAuctionPublishFormValues | IFixedPublishFormValues>;
  readonly?: boolean;
}

const CollaboratorCard = ({
  index,
  creator,
  allowFeedback,
  collaboratorsObj,
  control,
  readonly,
  setFocus,
  watch,
  unregister,
}: IProps) => {
  const { user } = useAuth();

  const coll = collaboratorsObj[index];
  const { id, username, fee, comment } = watch(`collaborators.${index}`);
  const status = getCollaborationStatus(coll);
  const defaultOpenFeedback = user && user['_id'] === coll.user['_id'] && status === 'pending';

  const hideFees = useMemo<boolean>(() => {
    if (!user) return true;

    if (user.role.name === 'admin') return false;

    if (user['_id'] !== creator) {
      return user['_id'] !== coll.user['_id'];
    }

    return false;
  }, [user, creator, coll]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [role, setRole] = useState<UserRoles>('artist');

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const focusFeeField = () => setFocus(`collaborators.${index}.fee`);

  useEffect(() => {
    let mounted = true;

    api.users.getOne(id).then(({ data }) => {
      if (mounted) {
        setRole(data.role.name);
      }
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!user) return;

    if (coll.user['_id'] === user['_id']) {
      setIsOpen(allowFeedback);
    }
  }, [user, coll, allowFeedback]);

  return (
    <div className={styles.root}>
      {isOpen ? (
        <Details
          role={role}
          status={status}
          index={index}
          readonly={readonly}
          comment={coll.feedback ?? comment}
          allowFeedback={defaultOpenFeedback || allowFeedback}
          control={control as Control<IFixedPublishFormValues | IAuctionPublishFormValues>}
          focusFee={focusFeeField}
          close={close}
          unregisterValue={unregister}
          hideFees={hideFees}
        />
      ) : (
        <Preview
          _id={id}
          status={status}
          open={open}
          username={username}
          role={role}
          fee={fee}
          hideFees={hideFees}
        />
      )}
    </div>
  );
};

export default CollaboratorCard;
