import Rooms from '@components/pages/private/Admin/ArtRooms';
import styles from './style.module.scss';

const ArtRooms = () => (
  <div className={styles.root}>
    <div className={styles.root__block}>
      <h2 className={styles.root__subtitle}>
        Art Rooms
      </h2>
      <div>
        <Rooms />
      </div>
    </div>
  </div>
);

export default ArtRooms;
