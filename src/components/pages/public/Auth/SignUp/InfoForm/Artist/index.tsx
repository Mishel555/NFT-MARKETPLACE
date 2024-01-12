import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import api from '@services/api';
import { TextField } from '@components/atoms';
import Terms from '../../Terms';
import { FIELDS } from './fields';
import validationSchema from './validation';

import styles from './style.module.scss';

interface IProps {
  confirm: (values: FieldValues) => void;
}

interface IForm {
  login: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  links?: string[];
  website?: string;
  role?: string;
}

const Artist = ({ confirm }: IProps) => {
  const navigate = useNavigate();

  const { register, handleSubmit, setFocus, watch, formState: { errors } } = useForm<IForm>({
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: { role: 'artist' },
  });

  const errorsCount = Object.keys(errors).length;

  const [isTermsAccepted, setIsTermAccepted] = useState<boolean>(false);
  const [socialLinks, setSocialLinks] = useState<number[]>([0]);
  // @ts-ignore
  const isLastSocialFilled = watch(`links[${socialLinks.length - 1}]`)?.length;

  const onTermsHandle = (value: boolean) => setIsTermAccepted(value);

  const goBack = (): void => navigate('/signUp/role');

  const addSocialLink = (): void => {
    if (!isLastSocialFilled) {
      // @ts-ignore
      setFocus(`links[${socialLinks.length - 1}]`);
    } else {
      setSocialLinks(prevState => [...prevState, socialLinks.length]);
    }
  };

  const onFormSuccess = async (values: FieldValues) => {
    try {
      if (!isTermsAccepted) {
        return toast.error('T&C acceptance is required');
      }

      const emptyIndex = values.links.findIndex((val: string) => val === '');

      if (emptyIndex > -1) {
        values.links.splice(emptyIndex, 1);

        setSocialLinks(prevState => {
          const temp = prevState;
          temp.splice(emptyIndex, 1);

          return temp;
        });
      }

      await api.auth.validateRegister({
        ...(values.login && ({ login: values.login })),
        ...(values.header && ({ header: values.header })),
        email: values.email,
      });

      confirm(values);
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.response?.data.message || error.message || e);
    }
  };

  return (
    <div className={styles.root}>
      <p className={styles.root__info}>All fields with * are required</p>
      <form onSubmit={handleSubmit(onFormSuccess)}>
        {FIELDS.map((props, index) => {
          const { name } = props;
          const error = (() => {
            if (errors) {
              if (name.includes('.')) {
                const index = name.indexOf('.');
                const first = name.slice(0, index) as unknown as keyof IForm;
                const second = name.slice(index + 1);

                if (errors[first]) {
                  // @ts-ignore
                  return errors[first][second]?.message;
                }
                return '';
              } else {
                return errors[name as keyof IForm]?.message;
              }
            }

            return '';
          })();

          return (
            <TextField
              key={index}
              error={error}
              inputProps={register(name as keyof IForm)}
              {...props}
            />
          );
        })}
        {socialLinks.map(index => (
          <TextField
            key={index}
            // @ts-ignore
            error={!!errors.links && errors.links[index]?.message}
            // @ts-ignore
            inputProps={register(`links[${index}]`)}
            element="input"
            label={!index ? 'Social media link' : ''}
            name={`links[${index}]`}
            placeholder="https://facebook.com"
          />
        ))}
        {socialLinks?.length < 2 && (
          <button
            type="button"
            className={styles.root__socialBtn}
            onClick={addSocialLink}
          >
            +Add another one
          </button>
        )}
        <TextField
          error={errors.website?.message}
          inputProps={register('website')}
          element="input"
          label="Own website link"
          name="website"
          placeholder="https://"
        />
        <hr />
        <Terms onChange={onTermsHandle} />
        <div className={styles.root__wrap}>
          <button type="button" className={styles.root__btn} onClick={goBack}>
            Back
          </button>
          <button type="submit" className={styles.root__btn} disabled={!!errorsCount || !isTermsAccepted}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Artist;
