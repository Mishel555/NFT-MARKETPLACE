import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { ArtType } from '@constants/types';

import DragDropIcon from '@assets/icons/upload-nft-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  type: ArtType;
  loadFile: (file: File, incompatibleResolution?: boolean) => void;
}

interface IValidator {
  min: number;
  max: number;
  resolutions?: {
    min: number;
    max: number;
    recommended?: number[];
  };
}

const REQUIREMENTS: { [key: string]: string[] } = {
  video: [
    'Minimal size - 500 Kb / Maximal size - 120 GB; 30 min',
    'Minimal resolution 1080x1080', // / Maximal resolution 13440x2160
    'Accepted video format - mp4',
  ],
  image: [
    'Minimal size - 7 Kb / Maximal size - 100 MB',
    'Minimal resolution 12x12', // / Maximal resolution 3840x2160',
    'Image format - JPEG, GIF',
  ],
};

const validation: { [key: string]: IValidator } = {
  image: {
    min: 0.007,
    max: 124,
    resolutions: {
      min: 12 * 12, // 12 * 12,
      max: 384000000 * 216000000, // 3840 * 2160,
    },
  },
  video: {
    min: 0.5,
    max: 120000,
    resolutions: {
      min: 1080 * 1080, // 1080 * 1080,
      max: 13440000 * 2160000, // 13440 * 2160,
      recommended: [13440 * 2160, 6720 * 2160, 10080 * 2160, 4800 * 2160],
      // 13440 * 2160, 6720 * 2160, 10080 * 2160, 4800 * 2160
    },
  },
};

const validator = ({
  max,
  min,
}: IValidator) => (file: File) => {
  const fileSize = +(file.size / (1024 * 1024)).toFixed(2); // file size to MB.

  if (file.size < min) {
    return {
      code: 'file-size-small',
      message: 'The uploaded video is less than the minimum allowed size.\n' +
        'Please upload a video that matches the requirements',
    };
  }
  if (fileSize > max) {
    return {
      code: 'file-size-large',
      message: 'Uploaded video over the maximum allowed video size.\n' +
        'Please upload a video that matches the requirements',
    };
  }

  return null;
};

const UploadArea = ({ type, loadFile }: IProps) => {
  const {
    open,
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: type === 'video' ? { 'video/*': ['.mp4'] } : { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg'] },
    noClick: true,
    noKeyboard: true,
    multiple: false,
    validator: validator(validation[type]),
  });

  useEffect(() => {
    if (fileRejections.length) {
      fileRejections.forEach(rejection => {
        toast.error(rejection.errors[0].message);
      });
    }
  }, [fileRejections]);

  useEffect(() => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      const element = document.createElement(type === 'image' ? 'img' : 'video');
      element.src = url;

      if (validation[type].resolutions) {
        element[type === 'video' ? 'onloadedmetadata' : 'onload'] = () => {
          const {
            min,
            max,
            recommended,
          } = validation[type].resolutions || {
            min: 0,
            max: 0,
            recommended: [],
          };

          let errorMessage: null | string = null;

          const { video, image } = {
            video: element as HTMLVideoElement,
            image: element as HTMLVideoElement,
          };

          const resolution = type === 'image' ? image.width * image.height : video.videoWidth * video.videoHeight;

          if (recommended && !recommended.includes(resolution)) {
            return loadFile(file, true);
          }

          if (type === 'image') {
            if (resolution < min) {
              errorMessage = `Uploaded ${type} less than the minimum allowed resolution. 
                Please upload a ${type} that matches the requirements.`;
            } else if (resolution > max) {
              errorMessage = `Uploaded ${type} over the maximum allowed resolution. 
                Please upload a ${type} that matches the requirements.`;
            }
          }

          if (errorMessage) {
            toast.error(errorMessage);
            return element.remove();
          }

          loadFile(file);
          element.remove();
        };
      } else {
        loadFile(file);
        element.remove();
      }
    }
  }, [type, loadFile, acceptedFiles]);

  return (
    <div className={styles.root} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={styles.root__meta}>
        <div className={styles.root__drag}>
          <div className={styles.root__drag_imgWrapper}>
            <img src={DragDropIcon} alt="drag" className={styles.root__drag_image} />
          </div>
          <div className={styles.root__container}>
            <p className={styles.root__drag_text}>
              Drag and drop
            </p>
            <p className={styles.root__drag_text}>
              your {type} here
            </p>
          </div>
          <button type="button" onClick={open} className={styles.root__meta_choose}>
            Choose {type} from computer
          </button>
        </div>
        <div className={styles.root__requirements}>
          <h1 className={styles.root__requirements_title}>
            Requirements:
          </h1>
          {REQUIREMENTS[type].map((requirement, index) => (
            <p key={index} className={styles.root__requirements_text}>{requirement}</p>
          ))}
          {type !== 'image' && (
            <div className={styles.root__requirements_group}>
              <ul className={styles.root__requirements_list}>
                <li>
                  360 ° 13440x2160
                </li>
                <li>
                  270 ° 10080x2160
                </li>
              </ul>
              <ul className={styles.root__requirements_list}>
                <li>
                  180 ° 6720x2160
                </li>
                <li>
                  110 ° 4800x2160
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
