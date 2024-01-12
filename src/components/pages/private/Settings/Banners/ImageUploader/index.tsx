import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import DragDropIcon from '@assets/icons/drag-drop-icon.svg';
import RemoveIcon from '@assets/icons/grey-delete-icon.svg';
import styles from './style.module.scss';
import { getFileUrl } from '../../../../../../utils/common';

interface IProps {
  defaultImage?: string | File;
  loadImage: (image: File | null) => void;
  resetImage: () => void;
}

const ImageUploader = ({
  defaultImage,
  loadImage,
  resetImage,
}: IProps) => {
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
  } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    noKeyboard: true,
    noClick: true,
    multiple: false,
  });

  const [preview, setPreview] = useState<string | null>(defaultImage ? (
    typeof defaultImage === 'string' ? defaultImage : getFileUrl(defaultImage)
  ) : null);

  const reset = useCallback(() => {
    setPreview(null);
    acceptedFiles.splice(0, 1);
    resetImage();
  }, [acceptedFiles, resetImage]);

  useEffect(() => {
    const file = acceptedFiles[0];

    if (file) {
      setPreview(getFileUrl(file));
      loadImage(file);
    }
  }, [acceptedFiles, defaultImage, loadImage]);

  return (
    <div className={styles.root}>
      <span className={styles.root__title}>Image</span>
      <div {...getRootProps()} className={styles.root__wrapper}>
        {preview ? (
          <div className={styles.root__wrapper_preview}>
            <img src={preview} alt="preview" onClick={open} className={styles.root__wrapper_preview} />
            <button type="button" onClick={reset} className={styles.root__wrapper_close}>
              <img src={RemoveIcon} alt="remove" />
            </button>
          </div>
        ) : (
          <img src={DragDropIcon} alt="dragAndDrop" onClick={open} className={styles.root__wrapper_default} />
        )}

        <input {...getInputProps} />
      </div>
    </div>
  );
};

export default ImageUploader;
