import { usePopup } from '@hooks';
import { CloseIcon } from '@components/icons';

import styles from './style.module.scss';

interface IProps {
  src: string;
}

const ImageView = ({ src }: IProps) => {
  const popup = usePopup();
  const close = () => popup.close();

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <button className={styles.root__close} type="button" onClick={close}>
          <CloseIcon fill="#7A52F4" width={30} />
        </button>
        <img alt="image" src={src} className={styles.root__image} />
      </div>
    </div>
  );
};

export default ImageView;
