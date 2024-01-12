import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useAuth, usePopup } from '@hooks';
import api from '@services/api';
import validationSchema from './validation';
import Item from './Item';

import AddIcon from '@assets/icons/grey-add-icon.svg';
import styles from './style.module.scss';

interface IType {
  _id: string;
  name: string;
  __v: number;
}

interface IForm {
  name: string;
}

const Emotions = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const { logOut } = useAuth();
  const popupController = usePopup();

  const [defaultCategories, setDefaultCategories] = useState<IType[]>([]);
  const [showAddInput, setShowAddInput] = useState<boolean>(false);

  const edit = async (id: string, value: string) => {
    try {
      const temp: IType[] = [...defaultCategories];

      await api.emotions.edit(id, { name: value });

      temp.forEach(type => {
        if (type['_id'] === id) {
          type.name = value;
        }
      });

      setDefaultCategories([...temp]);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const remove = async (id: string) => {
    const temp: IType[] = [...defaultCategories].filter(type => type['_id'] !== id);

    setDefaultCategories([...temp]);
  };

  const onFormSuccess = async (values: FieldValues) => {
    try {
      const { data } = await api.emotions.add(values);
      const temp = [...defaultCategories];
      temp.push(data);

      setDefaultCategories(temp);
      setShowAddInput(false);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const activeNew = () => {
    setShowAddInput(!showAddInput);
    setValue('name', '');
  };

  useEffect(() => {
    let mounted = true;

    api.emotions.getAll().then(({ data }) => {
      if (mounted) {
        setDefaultCategories(data);
      }
    });

    window.scrollTo(0, 0);
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.admin__main}>
      <h3 className={styles.treatment_title}>Emotions</h3>
      <div className={styles.treatment_box} key={defaultCategories.length}>
        {defaultCategories.map(({
          _id,
          name,
        }: IType, index) => (
          <Item
            key={index}
            id={_id}
            defaultTitle={name}
            edit={edit}
            remove={remove}
          />
        ))}
      </div>
      <button className={styles.treatment_add_button} onClick={activeNew}>
        Add a new type
        <img alt="icon" src={AddIcon} />
      </button>
      {showAddInput ? (
        <div className={styles.new_emotion_root}>
          <form onSubmit={handleSubmit(onFormSuccess)} className={styles.new_form}>
            <input
              {...register('name')}
            />
            <button type="submit">
              <img alt="icon" src={AddIcon} />
            </button>
          </form>
          {errors?.name?.message ? (
            <p className={styles.error_message}>
              {errors.name.message}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Emotions;
