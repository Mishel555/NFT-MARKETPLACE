import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { usePopup } from '@hooks';
import { IEditPreviewProps } from '@constants/types';
import api from '@services/api';
import { CloseIcon, EditPencil } from '@components/icons';

import styles from './style.module.scss';

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

const EditPreview = ({
  id,
  image,
  cb,
}: IEditPreviewProps) => {
  const popup = usePopup();

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

  const [preview, setPreview] = useState<string>(image);
  const [file, setFile] = useState<Blob | null>(null);

  const reset = () => {
    acceptedFiles.pop();
    setPreview(image);
    setFile(null);
  };

  const save = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('art', id);
        formData.append('file', file);

        await api.art.uploadImage(formData);
        toast.success('Preview successfully saved');
      }

      if (cb) {
        cb(preview);
      }

      popup.close();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);
      toast.error(error.response?.data.message || error.message || e);
    }
  };

  useEffect(() => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);

      setFile(file);
      setPreview(url);
    } else if (fileRejections.length) {
      toast.error(fileRejections[0]?.errors[0]?.message);
    }
  }, [acceptedFiles, fileRejections]);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <div className={styles.root__container}>
          <h1 className={styles.root__title}>Edit preview</h1>
          <p className={styles.root__text}>
            It is recommended to upload a square image for a
            better view on the card. JPEG and GIF formats are only allowed.
          </p>
          <div {...getRootProps()} className={styles.root__area}>
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
        </div>
        <div className={styles.root__actions}>
          <button onClick={popup.close} className={styles.root__close}>
            <CloseIcon fill="#000" />
          </button>
          <button onClick={popup.close} className={classNames(styles.root__actions_btn, styles.root__actions_cancel)}>
            cancel
          </button>
          <button onClick={save} className={classNames(styles.root__actions_btn, styles.root__actions_submit)}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPreview;
