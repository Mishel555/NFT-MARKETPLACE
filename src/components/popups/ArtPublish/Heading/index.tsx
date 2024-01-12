import { usePopup } from '@hooks';
import { CloseIcon } from '@components/icons';
import styles from './style.module.scss';

interface IProps {
  resale?: boolean;
}

const Heading = ({}: IProps) => {
  const { close } = usePopup();

  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>Publish NFT</h1>
      <button onClick={close} className={styles.root__close}>
        <CloseIcon fill="#000" width={24} height={24} />
      </button>
    </div>
  );
};

export default Heading;
