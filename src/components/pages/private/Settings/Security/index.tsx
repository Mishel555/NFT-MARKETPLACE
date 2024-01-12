import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { ISecurityFormValues, IUser } from '@constants/types';
import { useAuth } from '@hooks';
import api from '@services/api';
import { SettingsFormGroup } from '@components/organisms';
import FIELDS from './fields';
import validationScheme from './validation';

import styles from './styles.module.scss';

interface IProps {
  user: IUser;
}

const Security = ({ user }: IProps) => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: {
      errors,
      isDirty,
      isValidating,
    },
  } = useForm<ISecurityFormValues>({
    reValidateMode: 'onChange',
    resolver: yupResolver(validationScheme),
    defaultValues: {
      current: '',
      password: '',
      confirm: '',
    },
  });
  const { setToken } = useAuth();
  const { email } = useMemo(() => user, [user]);

  const [isResetAvailable, setIsResetAvailable] = useState<boolean>(isDirty);
  const [isSubmitAvailable, setIsSubmitAvailable] = useState<boolean>(isDirty);

  const onFormSuccess = useCallback(async (values: FieldValues) => {
    try {
      const { data } = await api.auth.login({
        email,
        password: values.current,
      });
      setToken(data.accessToken);

      delete values.current;
      await api.users.editMe(values);

      setIsResetAvailable(false);
      setIsSubmitAvailable(false);
      toast.success('Login details successfully updated');
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);

      if (error.response?.status === 401) {
        return setError('current', {
          message: 'Invalid password',
        });
      }

      toast.error(`${error.response?.statusText}, please try again`);
    }
  }, [email, setToken, setError]);

  useEffect(() => {
    setIsResetAvailable(isDirty);
    setIsSubmitAvailable(isDirty);
  }, [isDirty, isValidating]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onFormSuccess)}>
        {Object.keys(FIELDS).map((field, index) => (
          <SettingsFormGroup
            key={index}
            title={field}
            fields={FIELDS[field]}
            control={control as never}
            errors={errors}
          />
        ))}
        <div className={styles.root__wrap}>
          <button
            type="submit"
            disabled={!isSubmitAvailable}
            className={classNames(styles.root__btn, styles.root__btn_dark)}
          >
            Update Settings
          </button>
          <button
            type="button"
            onClick={() => reset()}
            disabled={!isResetAvailable}
            className={classNames(styles.root__btn, styles.root__btn_light)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
