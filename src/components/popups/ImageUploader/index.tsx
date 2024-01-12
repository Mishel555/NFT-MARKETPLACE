import { useCallback, useState } from 'react';
import { IImageUploaderProps } from '@constants/types';
import CropBox from './CropBox';
import UploadSection from './UploadSection';
import Controls from './Controls';

import styles from './style.module.scss';

const ImageUploader = ({
  cb,
  availableDimensions,
}: IImageUploaderProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [isCropped, setIsCropped] = useState<boolean>(false);

  const onUpload = useCallback((src: string) => {
    setUploadedImage(src);
  }, []);

  const onCropStart = useCallback(() => setIsCropped(false), []);
  const onCropEnd = useCallback(() => setIsCropped(true), []);
  const afterCrop = useCallback((image: Blob) => setCroppedImage(image), []);

  const resetImage = useCallback(() => {
    if (uploadedImage) {
      setUploadedImage(null);
    }
  }, [uploadedImage]);

  const upload = useCallback(() => {
    if (croppedImage) {
      setIsCropped(false);
      cb(croppedImage);
    }
  }, [cb, croppedImage]);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <div className={styles.root__content}>
          {uploadedImage ? (
            <CropBox
              afterCrop={afterCrop}
              onCropStart={onCropStart}
              onCropEnd={onCropEnd}
              availableDimensions={availableDimensions}
              src={uploadedImage}
            />
          ) : (
            <UploadSection availableDimensions={availableDimensions} afterUpload={onUpload} />
          )}
        </div>
        <Controls isUploaded={!!uploadedImage} isCropped={isCropped} goBack={resetImage} upload={upload} />
      </div>
    </div>
  );
};

export default ImageUploader;
