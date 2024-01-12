import { IUser } from '@constants/types';
import { MarketProfileCard } from '@components/molecules';

import styles from './style.module.scss';

interface IProps {
  users: IUser[];
  hasNextPage: boolean;
  loadMore: () => void;
}

const ProfileWrapper = ({
  users,
  hasNextPage,
  loadMore,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__wrapper}>
      {users.map((user, index) => (
        <MarketProfileCard key={index} user={user} />
      ))}
    </div>
    {hasNextPage && (
      <button onClick={loadMore} className={styles.root__more}>
        Show more
      </button>
    )}
  </div>
);

export default ProfileWrapper;
