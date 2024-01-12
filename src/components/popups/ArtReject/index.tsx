import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePopup } from '@hooks';
import { TextField } from '@components/atoms';
import validationScheme from './validation';

import styles from './style.module.scss';

interface IProps {
  id: string;
  adminReject: (id: string, reason: FieldValues) => void;
}

interface IForm {
  reason: string;
}

const ArtReject = ({
  id,
  adminReject,
}: IProps) => {
  const popupController = usePopup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(validationScheme),
  });

  const onFormSuccess = ({ reason }: FieldValues) => {
    adminReject(id, reason);
    close();
  };

  const close = () => {
    popupController.close();
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onFormSuccess)}>
        <div className={styles.root__wrapper}>
          <TextField
            error={errors?.reason?.message || ''}
            inputProps={register('reason')}
            element="textarea"
            name="reason"
            label="Reason"
          />
          <div className={styles.root__group}>
            <button type="submit" className={styles.root__group_btn}>
              Accept
            </button>
            <button type="button" className={styles.root__group_btn} onClick={close}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArtReject;
