import { IUser } from '@constants/types';
import styles from './style.module.scss';
import { ExhibitionUser } from '@components/atoms';

interface IProps {
  artists: (string | IUser)[];
  description?: string;
}

const Details = ({
  artists,
  description,
}: IProps) => {
  return (
    <div className={styles.root}>
      {artists.length && (
        <div className={styles.root__group}>
          <span className={styles.root__label}>Artists</span>
          <ul className={styles.root__wrapper}>
            {artists.map((user, index) => (
              <ExhibitionUser key={index} user={user} />
            ))}
          </ul>
        </div>
      )}
      {!!description && (
        <div className={styles.root__group}>
          <span className={styles.root__label}>Description</span>
          <p className={styles.root__text}>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Details;
