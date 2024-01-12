import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import classNames from 'classnames';
import { IBanner, IBannerColor, IBannersFormValues } from '@constants/types';
import TextField from '../TextField';
import ColorField from '../ColorField';
import DateField from '../DateField';
import ImageUploader from '../ImageUploader';
import validationScheme from './validation';

import styles from './style.module.scss';

interface IProps {
  banner: IBanner;
  saveBanner: (banner: IBanner) => void;
  deleteBanner: (id: string) => void;
}

const COLORS: IBannerColor[] = [
  {
    label: 'white',
    hex: '#fff',
  },
  {
    label: 'black',
    hex: '#000',
  },
];

const BannerItem = ({
  banner,
  saveBanner,
  deleteBanner,
}: IProps) => {
  const {
    _id,
    url,
    title,
    buttonName,
    description,
    countdown,
    image: savedImage,
  } = useMemo(() => banner, [banner]);

  const [image, setImage] = useState<File | null>(savedImage as unknown as File ?? null);
  const [activeColors, setActiveColors] = useState({
    'title.color': title?.color ?? '#fff',
    'description.color': description?.color ?? '#fff',
    'countdown.color': countdown?.color ?? '#fff',
  });

  const {
    control,
    setValue,
    handleSubmit,
  } = useForm<IBannersFormValues>({
    resolver: yupResolver(validationScheme),
    defaultValues: {
      ...(title && ({ title })),
      ...(description && ({ description })),
      ...(url && ({ url })),
      ...(buttonName && ({
        buttonName,
      })),
      ...(countdown && ({
        countdown: {
          color: countdown.color,
          endsAt: moment(countdown.endsAt).format(moment.HTML5_FMT.DATETIME_LOCAL),
        },
      })),
    },
  });

  const setColor = useCallback((name: string, value: string) => {
    setActiveColors(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const loadImage = useCallback(async (file: File | null) => {
    setImage(file);
  }, []);

  const resetImage = useCallback(() => {
    setImage(null);
  }, []);

  const onFormSuccess = useCallback(async (data: FieldValues) => {
    if (!image) {
      return toast.error('Upload image');
    }

    saveBanner({
      _id,
      image: image as unknown,
      ...data,
    } as IBanner);
  }, [_id, saveBanner, image]);

  useEffect(() => {
    setValue('title.color', activeColors['title.color']);
    setValue('description.color', activeColors['description.color']);
    setValue('countdown.color', activeColors['countdown.color']);
  }, [setValue, activeColors]);

  return (
    <form onSubmit={handleSubmit(onFormSuccess)} className={styles.root}>
      <TextField control={control} name="title.label" label="Title" element="input" />
      <ColorField
        name="title.color"
        label="Color of the title"
        availableColors={COLORS}
        activeColor={activeColors['title.color']}
        setColor={setColor}
      />
      <TextField control={control} name="description.label" label="Description" element="area" />
      <TextField control={control} name="buttonName" label="Button name" element="input" />
      <ColorField
        name="description.color"
        label="Color of the description"
        availableColors={COLORS}
        activeColor={activeColors['description.color']}
        setColor={setColor}
      />
      <TextField control={control} name="url" label="Link" element="input" />
      <DateField control={control} name="countdown.endsAt" label="Countdown" />
      <ColorField
        name="countdown.color"
        label="Color of countdown"
        availableColors={COLORS}
        activeColor={activeColors['countdown.color']}
        setColor={setColor}
      />
      <ImageUploader defaultImage={savedImage} loadImage={loadImage} resetImage={resetImage} />
      <div className={styles.root__btnGroup}>
        <button type="submit" className={classNames(styles.root__btnGroup_btn, styles.root__btnGroup_submit)}>
          Save
        </button>
        <button
          type="button"
          onClick={() => deleteBanner(_id)}
          className={classNames(styles.root__btnGroup_btn, styles.root__btnGroup_delete)}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default BannerItem;
