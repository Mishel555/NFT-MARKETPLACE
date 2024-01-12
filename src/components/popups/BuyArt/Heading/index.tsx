import { usePopup } from '@hooks';
import { CloseIcon } from '@components/icons';

import styles from './style.module.scss';

const Heading = () => {
  const { close } = usePopup();

  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>Buy NFT</h1>
      <button onClick={close} className={styles.root__close}>
        <CloseIcon width={24} height={24} fill="#000" />
      </button>
    </div>
  );
};

export default Heading;
