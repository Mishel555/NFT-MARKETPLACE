import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useAuth, usePopup } from '@hooks';
import api from '@services/api';
import Item from './Item';

import AddIcon from '@assets/icons/grey-add-icon.svg';
import styles from './style.module.scss';
import { ITypes } from '@constants/types';

interface IType {
  _id: string;
  name: string;
  __v: number;
}

const Types = () => {
  const {
    register,
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const { logOut } = useAuth();
  const popupController = usePopup();

  const [defaultTypes, setDefaultTypes] = useState<IType[]>([]);
  const [showAddInput, setShowAddInput] = useState<boolean>(false);

  const edit = async (id: string, value: string) => {
    try {
      const temp: IType[] = [...defaultTypes];

      await api.types.edit(id, { name: value });

      temp.forEach(type => {
        if (type['_id'] === id) {
          type.name = value;
        }
      });

      setDefaultTypes([...temp]);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const remove = async (id: string) => {
    const temp: IType[] = [...defaultTypes].filter(type => type['_id'] !== id);
    setDefaultTypes([...temp.filter(type => type['_id'] !== id)]);
  };

  const onFormSuccess = async (values: FieldValues) => {
    try {
      const { data } = await api.types.add(values);
      const temp = [...defaultTypes];
      temp.push(data);

      setDefaultTypes(temp);
      setShowAddInput(false);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    api.types.getAll().then(({ data }) => {
      if (mounted) {
        setDefaultTypes(data.filter((type: ITypes) => !type.special));
      }
    });

    window.scrollTo(0, 0);
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.admin__main}>
      <h3 className={styles.treatment_title}>Types</h3>
      <div className={styles.treatment_box} key={defaultTypes.length}>
        {defaultTypes.map(({
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
      <button className={styles.treatment_add_button} onClick={() => setShowAddInput(!showAddInput)}>
        Add a new type
        <img alt="icon" src={AddIcon} />
      </button>
      {showAddInput ? (
        <div className={styles.new_type_root}>
          <form onSubmit={handleSubmit(onFormSuccess)} className={styles.new_form}>
            <input
              {...register('name')}
            />
            <button type="submit">
              <img alt="icon" src={AddIcon} />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Types;
