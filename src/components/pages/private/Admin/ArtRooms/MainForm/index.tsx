import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { AxiosError } from 'axios';
import { useAuth, usePopup } from '@hooks';
import api from '@services/api';
import validationSchema from './validation';

import styles from '../../style.module.scss';

interface IPropTypes {
  defaultTitle: string;
  defaultDescription: string;
}

interface IForm {
  title: string;
  description: string;
}

const MainForm = ({
  defaultTitle,
  defaultDescription,
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

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const onFormSuccess = async (values: FieldValues) => {
    try {
      setShowErrorMessage(false);
      popupController.setData('Main Title has been saved.');
      popupController.open('notification');

      await api.pages.edit('artrooms', { content: values });
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        logOut();
        popupController.open('login');
      }
    }
  };

  const onFormError = () => {
    setShowErrorMessage(true);
  };

  useEffect(() => {
    if (defaultTitle && defaultDescription) {
      setValue('title', defaultTitle);
      setValue('description', defaultDescription);
    }
  }, [defaultTitle, defaultDescription, setValue]);

  return (
    <div className={classNames(styles.admin__faq_item, styles.admin__faq_item_main)}>
      <form onSubmit={handleSubmit(onFormSuccess, onFormError)}>
        <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_question)}>
          <p className={styles.admin__faq_group_title}>Title</p>
          <textarea
            className={classNames(
              styles.admin__faq_group_input,
              styles.admin__faq_group_input_main,
              showErrorMessage && errors?.title && styles.errored_input,
            )}
            placeholder="Art rooms"
            {...register('title')}
          />
          {showErrorMessage && errors?.title ? (
            <p className={styles.admin__faq_group_error}>
              {errors.title.message}
            </p>
          )
            : null}
        </div>
        <div className={classNames(styles.admin__faq_group, styles.admin__faq_group_top)}>
          <p className={styles.admin__faq_group_title}>Description</p>
          <textarea
            className={classNames(
              styles.admin__faq_group_area,
              showErrorMessage && errors?.description && styles.errored_input,
            )}
            {...register('description')}
          />
          {showErrorMessage && errors?.description ? (
            <p className={styles.admin__faq_group_error}>
              {errors.description.message}
            </p>
          )
            : null}
        </div>
        <div className={styles.admin__faq_controller}>
          <button
            className={classNames(styles.admin__faq_item_save, styles.btn)}
            type="submit"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;
