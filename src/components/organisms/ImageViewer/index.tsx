import { usePopup } from '@hooks';

import MaximizeIcon from '@assets/icons/maximize.svg';
import styles from './style.module.scss';

interface IProps {
  src: string;
  allowFull?: boolean;
}

const ImageViewer = ({
  src,
  allowFull,
}: IProps) => {
  const popup = usePopup();

  const fullscreen = () => {
    popup.setData(src);
    popup.open('image');
  };

  return (
    <div className={styles.root}>
      <img src={src} alt="nft" className={styles.root__img} />
      {allowFull && (
        <button onClick={fullscreen} className={styles.root__btn}>
          <img src={MaximizeIcon} alt="maximize" className={styles.root__icon} />
        </button>
      )}
    </div>
  );
};

export default ImageViewer;
