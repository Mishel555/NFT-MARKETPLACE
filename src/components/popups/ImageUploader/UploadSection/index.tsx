import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUploadIcon } from '@components/icons';
import { toast } from 'react-toastify';
import { IAvailableCropDimensions } from '@constants/types';

import styles from './style.module.scss';

interface IProps {
  afterUpload: (src: string) => void;
  availableDimensions: IAvailableCropDimensions;
}

const UploadSection = ({
  afterUpload,
  availableDimensions,
}: IProps) => {
  const {
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    minResolution,
    maxResolution,
    maxSize,
  } = useMemo(() => ({
    minResolution: {
      width: availableDimensions.minWidth,
      height: availableDimensions.minHeight,
    },
    maxResolution: {
      width: availableDimensions.maxWidth,
      height: availableDimensions.maxHeight,
    },
    ...availableDimensions,
  }), [availableDimensions]);
  const [isFillSvg, setIsFillSvg] = useState<boolean>(false);

  const onHover = useCallback(() => setIsFillSvg(true), []);
  const onLeave = useCallback(() => setIsFillSvg(false), []);
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    noClick: true,
    noKeyboard: true,
    multiple: false,
  });

  const resetZone = useCallback(() => {
    if (acceptedFiles) {
      acceptedFiles.splice(0, 1);
    }
  }, [acceptedFiles]);

  const validateUploadedImage = useCallback(() => {
    if (!acceptedFiles.length) {
      return;
    }

    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    const imageSize = acceptedFiles[0].size / 1024 / 1024;

    if (imageSize > maxSize) {
      resetZone();
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
        if (resolution.width < minResolution.width || resolution.height < minResolution.height) {
          resetZone();
          return toast.error('The image does not match the minimum resolution...');
        } else if (resolution.width > maxResolution.width || resolution.height > maxResolution.height) {
          resetZone();
          return toast.error('The image does not match the maximum resolution...');
        }
      }

      afterUpload(imageUrl);
      imgElement.remove();
    };
  }, [acceptedFiles, maxSize, resetZone, afterUpload, minResolution, maxResolution]);

  useEffect(() => {
    if (fileRejections.length) {
      toast.error('File does not meet requirements...');
    }
  }, [fileRejections]);

  useEffect(() => {
    validateUploadedImage();
  }, [validateUploadedImage]);

  return (
    <div {...getRootProps()} className={styles.root}>
      <div className={styles.root__drop}>
        <button onClick={open} onMouseOver={onHover} onMouseLeave={onLeave} className={styles.root__btn}>
          <CloudUploadIcon fill={isFillSvg ? '#7A52F4' : '#5D5D5B'} />
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
    </div>
  );
};

export default UploadSection;
