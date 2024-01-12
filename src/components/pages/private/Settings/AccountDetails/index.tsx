import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { AvailableNetworks, IAccountDetailsFormValues, IUser } from '@constants/types';
import { ZERO_ADDRESS } from '@constants/web3';
import { useAuth, useWeb3 } from '@hooks';
import api from '@services/api';
import { SettingsFormGroup } from '@components/organisms';

import validationSchemes from './validation';
import FIELDS from './fields';
import ImageSection from './ImageSection';
import LinksForm from './LinksForm';

import styles from './styles.module.scss';

interface IProps {
  user: IUser;
}

const AccountDetails = ({ user }: IProps) => {
  const { user: loggedUser, setUser } = useAuth();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { send } = useWeb3();
  const { address } = useAccount();

  const {
    role,
    header,
    login,
    email,
    description,
    taxOffice,
    address: userAddress,
    name,
    phone,
    dateOfBirth,
    manifesto,
    about,
    bio,
    portfolio,
    website,
    links,
  } = useMemo(() => (user), [user]);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: {
      errors,
      isDirty,
      isValidating,
    },
  } = useForm<IAccountDetailsFormValues>({
    reValidateMode: 'onChange',
    defaultValues: {
      email,
      login,
      header,
      description,
      phone,
      address: userAddress,
      taxOffice,
      dateOfBirth,
      manifesto,
      about,
      bio,
      portfolio,
      website,
      links,
      ...(name && {
        name: {
          first: name.first,
          last: name.last,
        },
      }),
    },
    resolver: yupResolver(validationSchemes[role.name]),
  });

  const [isResetAvailable, setIsResetAvailable] = useState<boolean>(isDirty);
  const [isSubmitAvailable, setIsSubmitAvailable] = useState<boolean>(isDirty);

  const drop = useCallback(async (amount: number, blockchain: AvailableNetworks) => {
    try {
      if (!loggedUser) return;

      await send('balanceDrop', { amount, blockchain });

      toast.success('Success');
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;

      toast.error(error.message ? error.message : e as string);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    } finally {
      setSearchParams({});
    }
  }, [loggedUser, navigate, send, setSearchParams]);

  const onFormSuccess = useCallback(async (values: FieldValues) => {
    try {
      // Delete undefined fields...
      Object.keys(values).forEach(key => values[key] === undefined && delete values[key]);

      if (values.links) {
        const emptyIndex = values.links.findIndex((link: string) => !link);
        if (emptyIndex > -1) {
          values.links.splice(emptyIndex, 1);
        }

        if (!values.links.length) {
          delete values.links;
        }
      }

      await api.users.editMe(values);
      toast.success('Details successfully updated');
      setIsResetAvailable(false);
      setIsSubmitAvailable(false);
      setUser({
        ...user,
        ...values,
      });
    } catch (e) {
      const error = e as AxiosError;
      const message = error.response?.data?.message;

      console.log(error);

      if (message.toLowerCase().includes('nickname')) {
        return setError('login', { message });
      } else if (message.toLowerCase().includes('email')) {
        return setError('email', { message });
      } else if (message.toLowerCase().includes('header')) {
        return setError('header', { message });
      }

      toast.error(`${error.response?.statusText}, please try again`);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [navigate, user, setUser, setError]);

  useEffect(() => {
    if (!loggedUser || loggedUser['_id'] !== user['_id'] || loggedUser.role.name === 'admin') return;

    const detectAction = async () => {
      try {
        const action = searchParams.get('action');
        const blockchain = searchParams.get('blockchain') as AvailableNetworks;

        if (!action || !blockchain) return;

        if (action === 'drop') {
          const wallet = address || loggedUser.wallet || ZERO_ADDRESS;
          const balance = await send('balanceGet', {
            blockchain,
            address: wallet,
          });
          const dropAmount = balance[blockchain];

          await drop(dropAmount, blockchain);
        }
      } catch (e) {
        const error = e as AxiosError;
        console.log(e);
        toast.error(error.response?.data.message || error.message || e);
      }
    };

    detectAction();
  }, [user, loggedUser, searchParams, drop, address, send]);

  useEffect(() => {
    setIsResetAvailable(isDirty);
    setIsSubmitAvailable(isDirty);
  }, [isDirty, isValidating]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <ImageSection />
      <form onSubmit={handleSubmit(onFormSuccess)}>
        {Object.keys(FIELDS[role.name]).map((field, index) => (
          <SettingsFormGroup
            key={index}
            title={field}
            fields={FIELDS[role.name][field]}
            control={control as never}
            errors={errors}
          />
        ))}
        {!!links && (
          <LinksForm control={control as never} links={links} />
        )}
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
            disabled={!isResetAvailable}
            onClick={() => reset()}
            className={classNames(styles.root__btn, styles.root__btn_light)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
