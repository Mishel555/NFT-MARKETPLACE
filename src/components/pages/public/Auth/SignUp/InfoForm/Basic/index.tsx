import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@components/atoms';
import Terms from '../../Terms';
import validationSchema from './validation';
import { FIELDS } from './fields';

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
  role?: string;
}

const Basic = ({ confirm }: IProps) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: { role: 'user' },
  });
  const errorsCount = Object.keys(errors).length;

  const [isTermsAccepted, setIsTermAccepted] = useState<boolean>(false);

  const onTermsHandle = (value: boolean) => setIsTermAccepted(value);

  const goBack = (): void => navigate('/signUp/role');

  const onSubmit = (values: FieldValues) => {
    if (!isTermsAccepted) {
      return toast.error('T&C acceptance is required');
    }

    confirm(values);
  };

  return (
    <div className={styles.root}>
      <p className={styles.root__info}>All fields with * are required</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {FIELDS.map((props, index) => {
          const { name } = props;
          const error = (() => {
            if (errors) {
              if (name.includes('.')) {
                const index = name.indexOf('.');
                const first = name.slice(0, index) as keyof IForm;
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
        <hr />
        <Terms onChange={onTermsHandle} />
        <div className={styles.root__wrap}>
          <button type="button" className={styles.root__btn} onClick={goBack}>
            Back
          </button>
          <button type="submit" className={styles.root__btn} disabled={!!errorsCount}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Basic;
