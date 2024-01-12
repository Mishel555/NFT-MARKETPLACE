import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { EditPencil } from '@components/icons';
import styles from './style.module.scss';

interface IProps {
  image: string | null;
  changeThumb: (file: Blob | null) => void;
}

const imageTypeValidator = (file: File) => {
  const fileSize = +(file.size / (1024 * 1024)).toFixed(2); // file size to MB.

  if (file.size < 0.1) {
    return {
      code: 'file-size-large',
      message: 'The uploaded image is less than the minimum allowed size.\n' +
        'Please upload a image that matches the requirements',
    };
  }
  if (fileSize > 10) {
    return {
      code: 'file-size-large',
      message: 'Uploaded image over the maximum allowed video size.\n' +
        'Please upload a image that matches the requirements',
    };
  }

  return null;
};

const ThumbStep = ({ image, changeThumb }: IProps) => {
  const {
    open,
    getRootProps,
    getInputProps,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg'] },
    noClick: true,
    noKeyboard: true,
    validator: imageTypeValidator,
    multiple: false,
  });

  const [preview, setPreview] = useState<string | null>(image);

  const reset = () => {
    acceptedFiles.pop();
    setPreview(image);
    changeThumb(null);
  };

  useEffect(() => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      changeThumb(file);

      setPreview(url);
    } else if (fileRejections.length) {
      toast.error(fileRejections[0]?.errors[0]?.message);
    }
  }, [acceptedFiles, fileRejections, changeThumb]);

  return (
    <div {...getRootProps()} className={styles.root}>
      <p className={styles.root__text}>
        It is recommended to upload a square image for a better view on the card. JPEG and GIF formats are only allowed.
      </p>
      {!!preview && (
        <img src={preview} alt="thumb" className={styles.root__image} />
      )}

      {preview !== image ? (
        <button onClick={reset} className={styles.root__reset}>
          Reset
        </button>
      ) : (
        <button onClick={open} className={styles.root__upload}>
          <EditPencil fill="#000" />
        </button>
      )}
      <input {...getInputProps()} />
    </div>
  );
};

export default ThumbStep;
