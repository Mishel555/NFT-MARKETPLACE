import classNames from 'classnames';
import { usePopup } from '@hooks';
import styles from './style.module.scss';

interface IProps {
  isUploaded: boolean;
  isCropped: boolean;
  goBack: () => void;
  upload: () => void;
}

const ImageUpload = ({
  isUploaded,
  isCropped,
  goBack,
  upload,
}: IProps) => {
  const { close } = usePopup();

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        {isUploaded && (
          <button
            onClick={upload}
            disabled={!isCropped}
            className={classNames(styles.root__btn, styles.root__btn_upload)}
          >
            Upload
          </button>
        )}
        <button onClick={isUploaded ? goBack : close} className={classNames(styles.root__btn, styles.root__btn_close)}>
          {isUploaded ? 'Back' : 'Close'}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
