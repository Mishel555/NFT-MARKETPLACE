import { CloseIcon } from '@components/icons';
import styles from './style.module.scss';

interface IProps {
  close: () => void;
}

const Heading = ({ close }: IProps) => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>Make an offer</h1>
    <button onClick={close} className={styles.root__close}>
      <CloseIcon fill="#000" width={24} height={24} />
    </button>
  </div>
);

export default Heading;
