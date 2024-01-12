import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import api from '@services/api';
import {
  IExhibition,
  IExhibitionFormValues,
  IExhibitionSubmitArgs,
  IExhibitionUserList,
  IUser,
} from '@constants/types';
import { isSourceAvailable } from '@utils';
import TopFields from './TopFields';
import BottomFields from './BottomFields';
import FormActions from './FormActions';
import validationScheme from './validation';

import styles from './style.module.scss';

interface IProps {
  defaultValues: IExhibition;
  save: (data: IExhibitionSubmitArgs) => void;
  cancel: (id: string) => void;
}

const Form = ({
  defaultValues,
  save,
  cancel,
}: IProps) => {
  const {
    _id,
    title,
    description,
    date,
    url,
    artists: memoizedArtists,
    curatedBy: memoizedCurator,
    unregisteredArtists,
    unregisteredCurators,
    location: {
      city,
      state,
    },
  } = useMemo(() => ({
    ...defaultValues,
    unregisteredArtists: defaultValues.sArtists?.split(',') || [],
    unregisteredCurators: defaultValues.sCuratedBy?.split(',') || [],
  }), [defaultValues]);

  const [image, setImage] = useState<File | Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
  } = useForm<IExhibitionFormValues>({
    defaultValues: {
      _id,
      title,
      description,
      url,
      year: moment(date).format('YYYY'),
      month: moment(date).format('MM'),
      day: moment(date).format('DD'),
      ...(city && { city }),
      ...(state && { state }),
    },
    resolver: yupResolver(validationScheme),
  });

  const [artists, setArtists] = useState<IUser[]>(memoizedArtists || []);
  const [curators, setCurators] = useState<IUser[]>(memoizedCurator || []);
  const [unRegisteredArtists, setUnregisteredArtists] = useState<string[]>(unregisteredArtists);
  const [unRegisteredCurators, setUnregisteredCurators] = useState<string[]>(unregisteredCurators);

  const [userList, setUserList] = useState<IExhibitionUserList>({
    artists: [],
    galleries: [],
  });

  const saveArtists = useCallback((artists: IUser[]) => {
    setArtists(artists);
  }, []);

  const saveCurator = useCallback((data: IUser[]) => {
    setCurators(data);
  }, []);

  const saveUnregisteredArtist = useCallback((users: string[]) => {
    setUnregisteredArtists(users);
  }, []);

  const saveUnregisteredCurators = useCallback((users: string[]) => {
    setUnregisteredCurators(users);
  }, []);

  const onUpload = useCallback((image: File | Blob | null) => {
    setImage(image);

    if (image) {
      setPreview(URL.createObjectURL(image));
    } else {
      setPreview(null);
    }
  }, []);

  const onFormSuccess = useCallback((data: IExhibitionFormValues) => {
    const values: IExhibitionSubmitArgs = {
      _id,
      title: data.title,
      description: data.description,
      date: `${data.year}-${data.month}-${data.day}`,
      city: data.city,
      state: data.state,
      artists: artists.map(({ _id }) => _id),
      curatedBy: curators.map(({ _id }) => _id),
      sArtists: unRegisteredArtists.join(','),
      sCuratedBy: unRegisteredCurators.join(','),
      url: data.url,
      ...(image && { image }),
      ...(preview && { preview }),
    };

    save(values);
  }, [_id, artists, unRegisteredArtists, curators, unRegisteredCurators, image, preview, save]);

  const loadUsers = useCallback(async () => {
    try {
      const { data: { users: artists } } = await api.users.getAll({
        role: 'artist',
        approved: true,
        pagination: false,
      });

      const { data: { users: galleries } } = await api.users.getAll({
        role: 'gallery',
        approved: true,
        pagination: false,
      });

      setUserList({
        artists,
        galleries,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (defaultValues.image) {
      isSourceAvailable(defaultValues.image).then(success => {
        if (success) {
          setPreview(defaultValues.image || null);
        }
      });
    }
  }, [defaultValues]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <form onSubmit={handleSubmit(onFormSuccess)} className={styles.root}>
      <TopFields
        control={control}
        onUpload={onUpload}
        preview={preview}
      />
      <BottomFields
        artists={artists}
        unregisteredArtists={unRegisteredArtists}
        curators={curators}
        unregisteredCurators={unRegisteredCurators}
        control={control}
        userList={userList}
        saveArtists={saveArtists}
        saveCurator={saveCurator}
        saveUnregisteredArtists={saveUnregisteredArtist}
        saveUnregisteredCurator={saveUnregisteredCurators}
      />
      <FormActions id={_id} cancel={cancel} />
    </form>
  );
};

export default Form;
