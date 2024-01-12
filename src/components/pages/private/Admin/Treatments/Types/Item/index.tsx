import { Fragment, useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useAuth, usePopup } from '@hooks';
import api from '@services/api';
import validationSchema from './validation';

import EditIcon from '@assets/icons/grey-edit-icon.svg';
import RemoveIcon from '@assets/icons/grey-delete-icon.svg';
import ApplyIcon from '@assets/icons/grey-done-icon.svg';

import styles from './style.module.scss';

interface IPropTypes {
  id: string;
  defaultTitle: string;
  edit: (id: string, value: string) => void;
  remove: (id: string) => void;
}

interface IForm {
  title: string;
}

const Item = ({
  id,
  defaultTitle,
  edit,
  remove,
}: IPropTypes) => {
  const { logOut } = useAuth();
  const popupController = usePopup();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const removeType = async () => {
    try {
      await api.types.remove(id);
      remove(id);
    } catch (e) {
      const error = e as AxiosError;

      if (error.message) {
        setErrorMessage(error.response?.data?.message);
      }

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const setEdit = useCallback((): void => {
    setIsEditable(true);
  }, []);

  const onFormSuccess = (values: FieldValues) => {
    setIsEditable(false);
    edit(id, values.title);
  };

  const onFormError = () => {
    setErrorMessage(errors?.title?.message || null);
  };

  useEffect(() => {
    setValue('title', defaultTitle);
  }, [defaultTitle, setValue]);

  return (
    <div className={styles.treatment_box_item_root}>
      <form onSubmit={handleSubmit(onFormSuccess, onFormError)} className={styles.treatment_box_form}>
        <div className={styles.treatment_box_item}>
          <input
            className={styles.treatment_box_item_title}
            type="text"
            disabled={!isEditable}
            {...register('title')}
          />
          {showConfirm ? (
            <div className={styles.confirm_box}>
              <button onClick={removeType}>
                Remove
              </button>
              <button onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <div className={styles.treatment_box_item_button_group}>
              {!isEditable && (
                <Fragment>
                  <button type="button" onClick={() => setShowConfirm(true)}>
                    <img alt="icon" src={RemoveIcon} />
                  </button>
                  <button type="button" onClick={setEdit}>
                    <img alt="icon" src={EditIcon} />
                  </button>
                </Fragment>
              )}
              {isEditable && (
                <button type="submit">
                  <img alt="icon" src={ApplyIcon} />
                </button>
              )}
            </div>
          )}

        </div>
        {!!errorMessage && (
          <p className={styles.error_message}>
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Item;
