import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import RemoveRoomModal from '@components/popups/ArtRoomRemove';
import validationSchema from './validation';

import DeleteCircleIcon from '@assets/icons/delete-circle-icon.svg';
import DragDropIcon from '@assets/icons/drag-drop-icon.svg';
import RemoveIcon from '@assets/icons/grey-delete-icon.svg';
import styles from '../../style.module.scss';

interface IResponseImage {
  _id: string;
  thumb: string;
  full: string;
}

interface IPropTypes {
  id?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultIp?: string;
  defaultAddress?: string;
  defaultImages?: IResponseImage[];
  add?: (data: FormData) => void;
  edit?: (id: string, data: FormData) => void;
  remove: (id: string) => void;
}

interface IForm {
  title: string;
  ip: string;
  description: string;
  location: string;
  photos: never;
}

const fileValidator = (file: File) => {
  const fileSize = +(file.size / (1024 * 1024)).toFixed(2); // file size to MB.

  if (file.size < 0.1) {
    return {
      code: 'file-size-small',
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

const minResolution = 1920 * 1080;
const maxResolution = 3840 * 2160;

const RoomItem = ({
  id,
  defaultTitle,
  defaultAddress,
  defaultDescription,
  defaultIp,
  defaultImages,
  add,
  edit,
  remove,
}: IPropTypes) => {
  const [images, setImages] = useState<IResponseImage[]>([]);

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg, .png, .jpg'],
    },
    noClick: true,
    noKeyboard: true,
    validator: fileValidator,
    multiple: true,
    maxFiles: (10 - images.length),
    onDrop: acceptedFiles => {
      setPreview(prevState => [...prevState, ...acceptedFiles]);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const title = getValues('title');

  const [fileError, setFileError] = useState<boolean | null>(null);
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<File[]>([]);
  const [acceptedImages, setAcceptedImages] = useState<File[]>([]);
  const [showErrorMessages, setShowErrorMessages] = useState<boolean>(false);

  const [showRemove, setShowRemove] = useState<boolean>(false);

  const removeRoom = (): void => {
    if (id) {
      remove(id);
      setShowRemove(false);
    } else {
      remove('null');
      setShowRemove(false);
    }
  };

  const removeImage = (image: File) => {
    const newFiles = [...preview];
    newFiles.splice(newFiles.indexOf(image), 1);
    acceptedFiles.splice(newFiles.indexOf(image), 1);

    if (acceptedImages.includes(image)) {
      const temp = [...acceptedImages];
      temp.splice(temp.indexOf(image), 1);

      setAcceptedImages(temp);
    }

    setPreview(newFiles);
  };

  const removeDefaultImage = (image: string) => {
    const temp = [...images].filter(({ _id }) => _id !== image);
    setImages(temp);
  };

  const onFormSuccess = (values: FieldValues) => {
    const formData = new FormData();

    if (acceptedImages.length) {
      acceptedImages.forEach((image) => {
        formData.append('photos[]', image);
      });
    }

    for (const key in values) {
      formData.append(key, values[key]);
    }

    if (add) {
      add(formData);
    } else if (edit && id) {
      if (images.length) {
        if ((images.length + values?.photos?.length || 0) < 11) {
          images.forEach(({ _id }) => {
            formData.append('photoIds[]', _id);
          });
        }
      } else {
        formData.append('photoIds[]', '');
      }

      edit(id, formData);
    }

    setShowErrorMessages(false);
  };

  const onFormError = () => {
    setShowErrorMessages(true);
  };

  useEffect(() => {
    if (acceptedFiles.length) {
      acceptedFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.src = url;
        image.onload = () => {
          const resolution = image.width * image.height;

          if (resolution < minResolution) {
            setFileError(true);
            setRejectedFiles(prevState => [...prevState, file]);
          } else if (resolution > maxResolution) {
            setFileError(true);
            setRejectedFiles(prevState => [...prevState, file]);
          } else {
            setAcceptedImages(prevState => [...prevState, file]);
            setFileError(false);
          }
        };
        image.remove();
      });
    } else if (fileRejections.length) {
      setFileError(true);
    }
  }, [acceptedFiles, fileRejections]);

  useEffect(() => {
    if (defaultTitle && defaultDescription && defaultAddress && defaultIp) {
      setValue('title', defaultTitle);
      setValue('description', defaultDescription);
      setValue('location', defaultAddress);
      setValue('ip', defaultIp);
    }
  }, [defaultTitle, defaultAddress, defaultDescription, defaultIp, setValue]);

  useEffect(() => {
    if (defaultImages?.length) {
      setImages(defaultImages);
    }
  }, [defaultImages]);

  return (
    <div className={styles.admin__faq_item}>
      <div className={styles.admin__faq_item_more}>
        <form onSubmit={handleSubmit(onFormSuccess, onFormError)}>
          <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_question)}>
            <p className={styles.admin__faq_group_title}>Title</p>
            <textarea
              className={classNames(
                styles.admin__faq_group_input,
                showErrorMessages && errors?.title && styles.errored_input,
              )}
              placeholder="Art room 1"
              {...register('title')}
            />
            {showErrorMessages && errors?.title ? (
              <p className={styles.admin__faq_group_error}>
                {errors.title.message}
              </p>
            )
              : null}
          </div>
          <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_top)}>
            <p className={styles.admin__faq_group_title}>IP address</p>
            <textarea
              className={classNames(
                styles.admin__faq_group_input,
                showErrorMessages && errors?.ip && styles.errored_input,
              )}
              {...register('ip')}
            />
            {showErrorMessages && errors?.ip ? (
              <p className={styles.admin__faq_group_error}>
                {errors.ip.message}
              </p>
            )
              : null}
          </div>
          <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_top)}>
            <p className={styles.admin__faq_group_title}>Description</p>
            <textarea
              className={classNames(
                styles.admin__faq_group_area,
                showErrorMessages && errors?.description && styles.errored_input,
              )}
              {...register('description')}
            />
            {showErrorMessages && errors?.description ? (
              <p className={styles.admin__faq_group_error}>
                {errors.description.message}
              </p>
            )
              : null}
          </div>
          <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_top)}>
            <p className={styles.admin__faq_group_title}>Location</p>
            <div className={styles.admin__faq_group_double}>
              <div className={styles.admin__faq_group_item}>
                <div className={styles.admin__faq_group_wrapper}>
                  <textarea
                    className={classNames(
                      styles.admin__faq_group_input,
                      showErrorMessages && errors?.location && styles.errored_input,
                    )}
                    {...register('location')}
                  />
                </div>
                {showErrorMessages && errors?.location ? (
                  <p className={styles.admin__faq_group_error}>
                    {errors.location.message}
                  </p>
                )
                  : null}
              </div>
            </div>
          </div>
          {preview.length || images.length ? (
            <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_top)}>
              <p className={styles.admin__faq_group_title}>Images</p>
              <div className={classNames(styles.admin__faq_list, styles.admin__faq_list_back)}>
                {preview?.map((file, index) => (
                  <div
                    key={index}
                    className={styles.admin__faq_list_item}
                  >
                    <button
                      className={styles.admin__faq_list_item_delete}
                      type="button"
                      onClick={() => removeImage(file)}
                    >
                      <img src={DeleteCircleIcon} alt="" />
                    </button>
                    <img
                      src={URL.createObjectURL(file)}
                      className={classNames(
                        styles.admin__faq_list_item_img,
                        rejectedFiles.includes(file) && styles.rejected_image_box,
                      )}
                      alt=""
                    />
                    <p
                      className={classNames(
                        styles.admin__faq_list_item_name,
                        rejectedFiles.includes(file) && styles.rejected_image_name,
                      )}
                    >
                      {file.name}
                    </p>
                    {rejectedFiles.includes(file) ? (
                      <div className={styles.file_reject_error}>
                        <img alt="icon" src={RemoveIcon} />
                      </div>
                    ) : null}
                  </div>
                ))}
                {images?.map(({
                  thumb,
                  _id,
                }, index) => (
                  <div key={index + 100} className={styles.admin__faq_list_item}>
                    <button
                      className={styles.admin__faq_list_item_delete}
                      type="button"
                      onClick={() => removeDefaultImage(_id)}
                    >
                      <img src={DeleteCircleIcon} alt="" />
                    </button>
                    <img
                      src={thumb}
                      className={styles.admin__faq_list_item_img}
                      alt=""
                    />
                    <p className={styles.admin__faq_list_item_name}>{_id}</p>
                  </div>
                ))}
                {(preview.length || images.length) && (preview.length + images.length < 10) ? (
                  <div className={styles.admin__faq_list_item} onClick={open}>
                    <img alt="" src={DragDropIcon} className={styles.upload_image} />
                  </div>
                ) : null}
              </div>
              {fileError ? (
                <p className={styles.admin__faq_group_error}>
                  Some images will not be saved.
                  Uploaded image should have from 100 KB to 10MB size and resolutions from 1920 x 1080 to 3840 x 2160
                </p>
              ) : null}
            </div>
          ) : (
            <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_top)}>
              <p className={styles.admin__faq_group_title}>Images</p>
              <div className={classNames(styles.admin__faq_images)} {...getRootProps()}>
                <div className={styles.admin__faq_images_wrap}>
                  <img
                    src={DragDropIcon}
                    className={styles.admin__faq_images_icon}
                    alt=""
                  />
                  <p className={styles.admin__faq_images_title}>
                    Drag and Drop your IMAGES here
                  </p>
                </div>
                <p className={styles.admin__faq_images_text}>
                  The maximum number of uploaded images is 10 files
                </p>
                <button className={classNames(styles.btn, styles.admin__faq_images_btn)} type="button" onClick={open}>
                  Choose IMAGES from computer
                </button>
                <input {...getInputProps()} />
              </div>
              {showErrorMessages && errors?.photos ? (
                <p className={styles.admin__faq_group_error}>
                  {errors.photos.message}
                </p>
              ) : null}
            </div>
          )}
          <div className={styles.admin__faq_controller}>
            <button className={classNames(styles.admin__faq_item_save, styles.btn)} type="submit">
              save
            </button>
            <button type="button" className={styles.admin__faq_item_delete} onClick={() => setShowRemove(true)}>
              <img src={RemoveIcon} alt="" />
              delete
            </button>
          </div>
        </form>
      </div>
      {showRemove && (
        <RemoveRoomModal
          title={title}
          close={() => {
            setShowRemove(false);
          }}
          confirm={removeRoom}
        />
      )}
    </div>
  );
};

export default RoomItem;
