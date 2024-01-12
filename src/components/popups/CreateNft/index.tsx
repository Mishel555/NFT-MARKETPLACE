import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { useAuth, usePopup } from '@hooks';
import { ArtType, ICreateNftProps, IProfileArtType } from '@constants/types';
import api from '@services/api';
import Header from './Header';
import Controls from './Controls';
import TypeStep from './TypeStep';
import UploadStep from './UploadStep';
import DescriptionStep from './DescriptionStep';
import PreviewStep from './PreviewStep';
import ThumbStep from './ThumbStep';
import validationSchema from './validation';

import styles from './style.module.scss';

const STEPS: string[] = [
  'Set Type of NFT',
  'Upload file',
  'Add descriptions',
  'Preview',
  'Update preview of the art',
];

const CreateNft = ({ cb }: ICreateNftProps) => {
  const { user } = useAuth();
  const popup = usePopup();
  const navigate = useNavigate();

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [step, setStep] = useState<number>(0);
  const [type, setType] = useState<ArtType>('video');
  const [artId, setArtId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [thumb, setThumb] = useState<Blob | null>(null);

  const changeThumb = useCallback((file: Blob | null) => {
    setThumb(file);
  }, []);

  const nextStep = () => setStep(prevState => prevState + 1);

  const prevStep = () => setStep(prevState => prevState - 1);

  const checkArtStatus = useCallback(() => {
    try {
      if (!artId) {
        if (interval.current) {
          clearInterval(interval.current);
        }

        return;
      }

      interval.current = setInterval(async () => {
        const { data } = await api.art.getSingle(artId);
        const { image, status, preview } = data as IProfileArtType;

        if (status === 'processed') {
          setImage(image);
          setPreview(preview);

          if (interval.current) {
            clearInterval(interval.current);
          }

          return;
        }

        if (status === 'processing') return;

        toast.error('Something went wrong, please try again...');

        if (interval.current) {
          clearInterval(interval.current);
        }
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }, [artId]);

  const selectType = (type: ArtType) => {
    setArtId(null);
    setImage(null);
    setPreview(null);
    setType(type);
  };

  const setArt = (id: string | null) => setArtId(id);

  const onFormSuccess = async (values: FieldValues) => {
    try {
      if (!artId) return;

      await api.art.submit(artId, values);
      nextStep();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        toast.error('Something went wrong, please try again...');
        navigate('/signIn');
      }
    }
  };

  const cancelProcessing = async () => {
    try {
      if (!artId) {
        return;
      }

      await api.art.delete(artId);
      setStep(0);
      setArtId(null);
      setImage(null);
      setPreview(null);
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        toast.error('Something went wrong, please try again...');
        navigate('/signIn');
      }
    }
  };

  const save = async () => {
    try {
      if (thumb && artId) {
        const formData = new FormData();
        formData.append('art', artId);
        formData.append('file', thumb);
        await api.art.uploadImage(formData);
      }

      popup.close();
      navigate('/multisensory');
    } catch (e) {
      console.log(e);
    }
  };

  const done = async () => {
    if (!user || !artId) return;

    if (thumb) {
      const formData = new FormData();
      formData.append('art', artId);
      formData.append('file', thumb);
      await api.art.uploadImage(formData);
    }

    if (type === 'video') {
      popup.close();
      return navigate(`/editor?art=${artId}`);
    }

    if (user.role.name === 'artist') {
      const { data } = await api.art.getSingle(artId);

      popup.close();
      popup.setData({ art: data });
      return popup.open('art_publish');
    }

    const { data } = await api.art.getSingle(artId);

    if (cb) {
      cb(data);
    }

    popup.setData({
      art: data,
    });
    popup.open('art_publish');
  };

  const createART = handleSubmit(onFormSuccess);

  useEffect(() => {
    checkArtStatus();
  }, [checkArtStatus]);

  useEffect(() => () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <Header title={STEPS[step]} step={step} close={popup.close} />
        <div className={classNames(styles.root__content, (step === 3 || step === 4) && styles.root__content_height)}>
          {(() => {
            switch (step) {
              case 0:
                return <TypeStep defaultType={type} select={selectType} />;
              case 1:
                return <UploadStep type={type} setArt={setArt} />;
              case 2:
                return <DescriptionStep control={control} setValue={setValue} />;
              case 3:
                return <PreviewStep type={type} preview={preview} cancel={cancelProcessing} />;
              case 4:
                return <ThumbStep image={image} changeThumb={changeThumb} />;
              default:
                return <TypeStep defaultType={type} select={selectType} />;
            }
          })()}
        </div>
        <Controls
          type={type}
          step={step}
          artId={artId}
          role={user?.role.name || 'admin'}
          next={nextStep}
          prev={prevStep}
          close={popup.close}
          done={done}
          save={save}
          create={createART}
        />
      </div>
    </div>
  );
};

export default CreateNft;
