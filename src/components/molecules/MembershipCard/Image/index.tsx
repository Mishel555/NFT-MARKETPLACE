import { InternalLink } from '@components/atoms';
import styles from './style.module.scss';

interface IProps {
  id: string;
  src: string;
}

const Image = ({ id, src }: IProps) => (
  <div className={styles.root}>
    <InternalLink to={`/membership/${id}`}>
      <img src={src} alt="membership" className={styles.root__image} />
      <span className={styles.root__paige}>Yearly</span>
    </InternalLink>
  </div>
);

export default Image;
