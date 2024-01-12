import { isMobile } from 'react-device-detect';
import { CollaboratorStatusType, UserRoles } from '@constants/types';
import { getProfilePublicRoute } from '@utils';
import { usePopup } from '@hooks';
import { CollaboratorStatusBadge, InternalLink, UserBadge } from '@components/atoms';
import styles from './style.module.scss';

interface IProps {
  _id: string;
  status: CollaboratorStatusType;
  username: string;
  role: UserRoles;
  fee: number;
  open: () => void;
  hideFees?: boolean;
}

const Preview = ({ _id, status, username, role, fee, open, hideFees }: IProps) => {
  const { close } = usePopup();

  return (
    <div className={styles.root} {...isMobile && ({ onClick: open })}>
      <InternalLink to={getProfilePublicRoute(_id, role)} onClick={close} className={styles.root__label}>
        {username}
      </InternalLink>
      <p className={styles.root__label}>
        {hideFees ? '-- ' : fee}%
      </p>
      <UserBadge role={role} className={styles.root__roleBadge} />
      <CollaboratorStatusBadge status={status} />
      {!hideFees && status === 'declined' && (
        <button onClick={open} className={styles.root__action}>View reason</button>
      )}
    </div>
  );
};

export default Preview;
