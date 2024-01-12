import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { TextField } from '@components/atoms';
import { ActionStateType } from '../index';
import validationScheme from './validation';

import AcceptIcon from '@assets/icons/check-brown-icon.svg';
import DeclineIcon from '@assets/icons/remove-grey-icon.svg';
import styles from './style.module.scss';

interface IPropTypes {
  selectAction: (action: ActionStateType) => void;
  reject: (message: string) => void;
}

interface IForm {
  cause: string;
}

const Reject = ({
  selectAction,
  reject,
}: IPropTypes) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    reValidateMode: 'onChange',
    resolver: yupResolver(validationScheme),
  });

  const onFormSuccess = ({ cause }: FieldValues) => {
    reject(cause);
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onFormSuccess)}>
        <p className={styles.root__title}>Write the reason of rejection</p>
        <div className={styles.root__block}>
          <p className={styles.root__label}>Cause of rejection</p>
          <div className={classNames(styles.root__group, styles.root__group_error)}>
            <TextField
              error={errors.cause?.message || ''}
              inputProps={register('cause')}
              element="textarea"
              name="cause"
              placeholder="Enter Your Text Here"
            />
          </div>
        </div>
        <div className={styles.btn__root}>
          <button className={styles.btn__root__btn} type="submit">
            <img src={AcceptIcon} alt="" />
            Send
          </button>
          <button
            className={classNames(styles.btn__root__btn, styles.btn__root__btn_decline)}
            type="button"
            onClick={() => selectAction('default')}
          >
            <img src={DeclineIcon} alt="" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reject;
