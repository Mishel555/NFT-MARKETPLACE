import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Cropper } from 'react-cropper';
import { IAvailableCropDimensions, ICropperData, ICropperImageElement } from '@constants/types';
import { useDebounce } from '@hooks';

import 'cropperjs/dist/cropper.css';
import styles from './style.module.scss';

const cropperOptions = {
  dragMode: 'move',
  initialAspectRatio: 1,
  viewMode: 1,
  background: false,
};

interface IProps {
  src: string;
  availableDimensions: IAvailableCropDimensions;
  afterCrop: (image: Blob) => void;
  onCropStart: () => void;
  onCropEnd: () => void;
}

const CropBox = ({
  src,
  availableDimensions,
  afterCrop,
  onCropStart,
  onCropEnd,
}: IProps) => {
  const {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  } = useMemo(() => (availableDimensions), [availableDimensions]);

  const [cropData, setCropData] = useState<ICropperData | null>(null);
  const debouncedCropData = useDebounce(cropData, 1);

  const cropperRef = useRef<ICropperImageElement | null>(null);
  const cropPrevData = useRef<ICropperData | null>(null);

  const onChange = useCallback(() => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (!cropper) {
      return;
    }

    const data = cropper.getData();
    setCropData(data);
  }, []);

  const crop = useCallback(() => {
    onCropStart();
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const canvas = cropper?.getCroppedCanvas();

    if (!canvas) {
      onCropEnd();
      return;
    }

    canvas.toBlob((blob) => {
      if (blob) {
        afterCrop(blob);
      }

      onCropEnd();
    });
  }, [afterCrop, onCropEnd, onCropStart]);

  useEffect(() => {
    if (!debouncedCropData) {
      return;
    }

    const imageElement: ICropperImageElement | null = cropperRef?.current;
    const cropper = imageElement?.cropper;

    if (!cropper || !debouncedCropData.width || !debouncedCropData.height) {
      return;
    }

    if (
      debouncedCropData.width < minWidth
      || debouncedCropData.height < minHeight
      || debouncedCropData.width > maxWidth
      || debouncedCropData.height > maxHeight
    ) {
      if (cropPrevData.current) {
        cropper.setData(cropPrevData.current);
      } else {
        cropper.setData({
          width: Math.max(minWidth, Math.min(maxWidth, debouncedCropData.width)),
          height: Math.max(minHeight, Math.min(maxHeight, debouncedCropData.height)),
        });
      }
    } else {
      cropPrevData.current = debouncedCropData;
    }
  }, [debouncedCropData, maxHeight, maxWidth, minHeight, minWidth]);

  useEffect(() => {
    crop();
  }, [crop]);

  return (
    <div className={styles.root}>
      <div className={styles.root__cropper}>
        <Cropper
          ref={cropperRef}
          src={src}
          crop={onChange}
          cropend={crop}
          {...cropperOptions as Cropper.Options}
          className={styles.root__cropper}
        />
      </div>
    </div>
  );
};

export default CropBox;
