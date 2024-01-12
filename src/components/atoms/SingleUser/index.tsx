import { IArtUser, IUser } from '@constants/types';
import { getProfilePublicRoute, getShortAddress } from '@utils';
import { InternalLink } from '@components/atoms';

import CreatorAvatar from '@assets/images/creator-img-small.png';
import styles from './style.module.scss';

interface IProps {
  user: IArtUser | IUser;
  status?: string;
}

const SingleUser = ({ user, status }: IProps) => (
  <div className={styles.root}>
    <p className={styles.root__status}>
      {status}
    </p>
    <div className={styles.root__inner}>
      <img src={CreatorAvatar} alt="avatar" className={styles.root__avatar} />
      <InternalLink to={getProfilePublicRoute(user['_id'], user.role?.name ?? 'user')} className={styles.root__link}>
        <p className={styles.root__number}>
          {user.header ?? user.login}
        </p>
        {!!user.wallet && (
          <p className={styles.root__number}>
            {getShortAddress(user.wallet)}
          </p>
        )}
      </InternalLink>
    </div>
  </div>
);

export default SingleUser;
