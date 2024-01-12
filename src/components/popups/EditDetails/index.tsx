import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { IEditDetails, IProfileArtType } from '@constants/types';
import { usePopup } from '@hooks';
import api from '@services/api';
import { CloseIcon } from '@components/icons';

import TextField from './TextField';
import TypeBox from './TypeBox';
import EmotionBox from './EmotionBox';
import Actions from './Actions';
import validationSchema from './validation';

import styles from './style.module.scss';

interface IForm {
  title: string;
  description: string;
  type: string;
  emotions: string[];
}

const EditDetails = ({
  id,
  cb,
}: IEditDetails) => {
  const { close } = usePopup();

  const [art, setArt] = useState<IProfileArtType | null>(null);

  const { control, setValue, handleSubmit } = useForm<IForm>({
    defaultValues: {},
    resolver: yupResolver(validationSchema),
  });


  const onFormSuccess = async (values: IForm) => {
    try {
      await api.art.edit(id, values);
      const { data } = await api.art.getSingle(id);

      if (cb) {
        cb(data);
      }

      close();
      toast.success('Art successfully saved');
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = handleSubmit(onFormSuccess);

  useEffect(() => {
    let mounted = true;

    const loadArt = async () => {
      try {
        const { data } = await api.art.getSingle(id);

        if (mounted) {
          setArt(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadArt();

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!art) return;

    setValue('title', art.title);
    setValue('description', art.description);
    setValue('emotions', art.emotions.map(emotion => emotion['_id']));

    if (art.type) {
      setValue('type', art.type['_id']);
    }
  }, [art, setValue]);

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <div className={styles.root__header}>
          <h1 className={styles.root__title}>Edit NFT</h1>
          <button onClick={close} type="button" className={styles.root__close}>
            <CloseIcon fill="#000" width={24} height={24} />
          </button>
        </div>
        {art && (
          <form onSubmit={onSubmit} className={styles.root__form}>
            <TextField type="input" name="title" label="Title" control={control} placeholder="Insert NFT title here" />
            <div className={styles.root__block}>
              <TypeBox control={control} setValue={setValue} defaultType={art.type && art.type['_id']} />
              <EmotionBox
                control={control}
                setValue={setValue}
                defaultEmotions={art.emotions.map(emotion => emotion['_id'])}
              />
            </div>
            <TextField type="area" name="description" label="Description" control={control} />
            <Actions close={close} />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditDetails;
