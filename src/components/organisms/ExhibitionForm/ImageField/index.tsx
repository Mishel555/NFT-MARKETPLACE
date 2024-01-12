import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { CloudUploadIcon } from '@components/icons';

import PencilIcon from '@assets/icons/pencil-icon.svg';
import styles from './style.module.scss';

interface IProps {
  onUpload: (image: File | null) => void;
  preview: string | null;
}

const {
  maxSize,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
} = {
  maxSize: 5,
  minWidth: 1024,
  maxWidth: 2500,
  minHeight: 835,
  maxHeight: 1500,
};

const ImageField = ({
  onUpload,
  preview,
}: IProps) => {
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    fileRejections,
    isDragActive,
  } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    noClick: true,
    noKeyboard: true,
    multiple: false,
  });

  const [isFillSvg, setIsFillSvg] = useState<boolean>(false);

  const onHover = useCallback(() => setIsFillSvg(true), []);
  const onLeave = useCallback(() => setIsFillSvg(false), []);

  const reset = useCallback(() => {
    if (acceptedFiles.length) {
      acceptedFiles.slice(0, 1);
    }

    onUpload(null);
  }, [acceptedFiles, onUpload]);

  const validateUploadedImage = useCallback(() => {
    if (!acceptedFiles.length) {
      return;
    }

    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    const imageSize = acceptedFiles[0].size / 1024 / 1024;

    if (imageSize > maxSize) {
      reset();
      return toast.error('The image does not match the maximum size...');
    }

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.onload = () => {
      const resolution = {
        width: imgElement.width,
        height: imgElement.height,
      };

      if (resolution) {
        if (resolution.width < minWidth || resolution.height < minHeight) {
          reset();
          return toast.error('The image does not match the minimum resolution...');
        } else if (resolution.width > maxWidth || resolution.height > maxHeight) {
          reset();
          return toast.error('The image does not match the maximum resolution...');
        }
      }

      imgElement.remove();
      onUpload(acceptedFiles[0]);
    };
  }, [acceptedFiles, reset, onUpload]);

  useEffect(() => {
    validateUploadedImage();
  }, [validateUploadedImage]);

  useEffect(() => {
    if (fileRejections.length) {
      toast.error('File does not meet requirements...');
    }
  }, [fileRejections]);

  return (
    <div className={styles.root}>
      {preview ? (
        <Fragment>
          <img src={preview} className={styles.root__img} alt="" />
          <button type="button" onClick={reset} className={styles.root__edit}>
            <img src={PencilIcon} alt="" />
          </button>
        </Fragment>
      ) : (
        <div {...getRootProps()} className={styles.root__upload}>
          <div className={styles.root__drop}>
            <button
              type="button"
              onClick={open}
              onMouseOver={onHover}
              onMouseLeave={onLeave}
              className={styles.root__btn}
            >
              <CloudUploadIcon fill={isDragActive || isFillSvg ? '#7A52F4' : '#5D5D5B'} />
            </button>
            <input {...getInputProps()} />
          </div>
          <div className={styles.root__meta}>
            <h2 className={styles.root__meta_title}>
              Drag your item to upload
            </h2>
            <p className={styles.root__meta_desc}>
              PNG, JPEG. Maximum file size {maxSize} Mb.
            </p>
            <p className={styles.root__meta_desc}>
              Minimum resolution {minWidth}x{minHeight}, maximum resolution {maxWidth}x{maxHeight}
            </p>
          </div>
          <input {...getInputProps()} />
        </div>
      )}
    </div>
  );
};

export default ImageField;
