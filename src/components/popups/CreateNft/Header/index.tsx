import { CloseIcon } from '@components/icons';
import styles from './style.module.scss';

interface IProps {
  title: string;
  step: number;
  close: () => void;
}

const Header = ({
  title,
  step,
  close,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__content}>
      <h1 className={styles.root__title}>Create New NFT</h1>
      <button onClick={close} type="button" className={styles.root__close}>
        <CloseIcon fill="#000" width={24} height={24} />
      </button>
    </div>
    <h2 className={styles.root__step}>{step + 1}. {title}</h2>
  </div>
);

export default Header;
