import { useEffect, useState, Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import { downloadArtFile } from '@utils';
import { useAuth, useDeviceManage, usePopup } from '@hooks';
import { AxiosError } from 'axios';
import api from '@services/api';
import { IEmotion, ITypes, IVideoMetaInfo } from '@constants/types';
import { VideoPlayer } from '@components/organisms';
import validationSchema from './validation';
import TypeBox from './Type';
import EmotionBox from './EmotionBox';
import SaveSuccess from '../ArtSaveSuccess';

import UploadIcon from '@assets/icons/upload-icon.svg';
import UploadIconDark from '@assets/icons/upload-icon-dark.svg';
import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

interface IForm {
  title: string;
  description: string;
  emotions: string;
  type: string;
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

const minResolution = 1920 * 1080;
const maxResolution = 3840 * 2160;

const EditorPreview = () => {
  const [search] = useSearchParams();
  const id = search.get('art');
  const navigate = useNavigate();
  const {
    logOut,
    token,
    user,
  } = useAuth();
  const popupController = usePopup();
  const deviceManager = useDeviceManage();
  const localActuations = deviceManager.devices;

  const {
    open,
    getRootProps,
    getInputProps,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
    },
    noClick: true,
    noKeyboard: true,
    validator: imageTypeValidator,
    multiple: false,
  });

  const methods = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [src, setSrc] = useState<string | null>(null);
  const [defaultType, setDefaultType] = useState<ITypes | null>(null);
  const [defaultEmotions, setDefaultEmotions] = useState<IEmotion[] | null>(null);
  const [defaultThumb, setDefaultThumb] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<IVideoMetaInfo | null>(null);

  const close = () => popupController.close();

  const onFormSuccess = async (values: FieldValues) => {
    try {
      if (id) {
        const data = deviceManager.saveDevices() as unknown as object;

        if (acceptedFiles[0]) {
          const formData = new FormData();
          formData.append('art', id);
          formData.append('file', acceptedFiles[0]);

          await api.art.uploadImage(formData);
          await api.art.edit(id, { ...values, ...data });
          setShowSuccess(true);
          close();
        } else {
          await api.art.edit(id, { ...values, ...data });
          setShowSuccess(true);
          close();
        }
      }
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const downloadArt = async () => {
    if (id && token) {
      downloadArtFile(id, token);
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        if (id) {
          const { data: art } = await api.art.getSingle(id);
          const src = art.preview;
          const {
            title,
            description,
            emotions,
            type,
            info,
            image,
          } = art;

          if (mounted) {
            setValue('title', title);
            setValue('description', description);

            setSrc(src);
            setDefaultType(type);
            setDefaultEmotions(emotions);
            setDefaultThumb(image);

            if (info) {
              setVideoInfo(info);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [id, setValue]);

  useEffect(() => {
    if (acceptedFiles.length) {
      const url = URL.createObjectURL(acceptedFiles[0]);
      const video = document.createElement('video');
      video.src = url;
      video.onloadedmetadata = () => {
        const resolution = video.videoWidth * video.videoHeight;

        if (resolution) {
          if (resolution < minResolution) {
            setErrorMessage('Uploaded image less than the minimum allowed resolution. Please upload a image that matches the requirements.');
          } else if (resolution > maxResolution) {
            setErrorMessage('Uploaded image over the maximum allowed resolution. Please upload a image that matches the requirements.');
          }
        }

        video.remove();
      };
    } else if (fileRejections.length) {
      setErrorMessage(fileRejections[0]?.errors[0]?.message);
    }
  }, [acceptedFiles, fileRejections]);

  return (
    <Fragment>
      {showSuccess ? (
        <SaveSuccess
          close={() => setShowSuccess(false)}
          back={() => {
            navigate(`/profile/${user ? user['_id'] : '/'}`);
          }}
        />
      ) : null}
      <div className={styles.popup__dark}>
        <div className={styles.popup__preview}>
          <button className={styles.popup__preview_btn} type="button" onClick={close}>
            <img src={CloseIcon} alt="" />
          </button>
          <div className={styles.form}>
            <h1 className={styles.form_title}>
              Preview
            </h1>
            <form onSubmit={handleSubmit(onFormSuccess)}>
              <div className={styles.form__group}>
                <label className={styles.form__group_label}>
                  Title
                </label>
                <input
                  type="text"
                  className={styles.form__group_input}
                  {...register('title')}
                />
                {errors?.title?.message ? (
                  <p className={styles.form_error}>
                    {errors.title.message}
                  </p>
                ) : null}
              </div>
              <div className={styles.form__group}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <EmotionBox setValue={setValue} selectedEmotions={defaultEmotions} />
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <TypeBox setValue={setValue} selectedType={defaultType} />
              </div>
              {errors?.emotions?.message || errors?.type?.message ? (
                <p className={styles.form_error}>
                  {errors.emotions?.message && 'Emotions is required filed' || errors.type?.message}
                </p>
              ) : null}
              <div className={styles.form__group}>
                <label className={styles.form__group_label}>Description</label>
                <textarea
                  className={styles.form__group_message}
                  {...register('description')}
                />
              </div>
              {errors?.description?.message ? (
                <p className={styles.form_error}>
                  {errors.description.message}
                </p>
              ) : null}
              <div className={styles.form__art}>
                <div className={styles.form__art_wrap}>
                  <label className={styles.form__group_label}>Art image</label>
                  <div className={styles.form__art_block} {...getRootProps()}>
                    <input
                      {...getInputProps()}
                    />
                    <img
                      src={acceptedFiles[0] ? URL.createObjectURL(acceptedFiles[0]) : defaultThumb}
                      className={styles.form__art_img}
                      alt=""
                    />
                    <div className={styles.form__art_info}>
                      <button className={styles.form__art_btn} onClick={open} type="button">
                        upload
                        <img src={UploadIcon} className={styles.form__art_icon} alt="" />
                        <img src={UploadIconDark} className={styles.form__art_icon_dark} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                {errorMessage ? (
                  <p className={styles.form__art_error}>
                    Uploaded image should have from 100 KB to 10MB
                    size and resolutions from 1920 x 1080 to 3840 x 2160.
                    Please upload image under the resolutions.
                  </p>
                ) : null}
              </div>
              <div className={styles.form__bottom}>
                <button type="button" className={styles.form_btn} onClick={downloadArt}>
                  DOWNLOAD art
                </button>
                <button type="submit" className={styles.form_btn_ghost}>
                  save
                </button>
              </div>
            </form>
          </div>
          <div className={styles.popup__preview_wrap}>
            <label className={styles.form__group_label}>Video preview</label>
            <div className={styles.popup__preview_video}>
              {!!src && !!videoInfo && (
                <VideoPlayer
                  src={src}
                  actuations={localActuations || []}
                  info={videoInfo}
                  actuationType="front"
                  allowOutSRC
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditorPreview;
