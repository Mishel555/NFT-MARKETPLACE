import { Fragment, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { IFee } from '@constants/types';
import { EditableFeePaige } from '@components/molecules';
import { ActionStateType } from '../index';
import FeeOption from '../FeeOption';

import AcceptIcon from '@assets/icons/check-brown-icon.svg';
import DeclineIcon from '@assets/icons/remove-grey-icon.svg';
import styles from './style.module.scss';

interface IPropTypes {
  selectAction: (action: ActionStateType) => void;
  approve: (fee?: IFee) => void;
  byAdmin?: boolean;
}

const OPTIONS: { id: number; description: string }[] = [
  {
    id: 1,
    description: 'Free fee',
  },
  {
    id: 2,
    description: 'Fixed Fee percent for all purchases',
  },
  {
    id: 3,
    description: 'Two-step limit percentage',
  },
  {
    id: 4,
    description: 'Three step limit percentage',
  },
];

const Approve = ({
  selectAction,
  byAdmin,
  approve,
}: IPropTypes) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm();

  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [logicError, setLogicError] = useState<string | null>(null);

  const selectOption = (option: number): void => {
    reset();
    setLogicError(null);
    setSelectedOption(option);
  };

  const onFormSuccess = (values: FieldValues) => {
    const {
      amounts,
      percents,
    } = values;

    const percentError = percents?.findIndex((percent: number) => selectedOption !== 1 && !percent || isNaN(percent));
    const amountError = amounts?.findIndex((amount: number, index: number) => (
      index === 0 ? amounts[index + 1] < amount + 1 : amounts[index + 1] < amount + 2 || amount < 0
    ));

    if (amountError > -1) {
      return setLogicError('Price limit does’t match the logic. Please set correct price.');
    }

    if (percentError > -1) {
      return setLogicError('Percent limit does’t match the logic. Please set correct price.');
    }

    setLogicError(null);

    if (!byAdmin) {
      approve(values as IFee);
    } else {
      approve();
    }
  };

  useEffect(() => {
    if (selectedOption === 1) {
      register('amounts', {
        value: [],
      });

      register('percents.0', {
        valueAsNumber: true,
        value: 0,
      });

      return;
    }

    if (selectedOption > 2) {
      register('amounts.0', {
        valueAsNumber: true,
        value: 0,
      });
    } else {
      register('amounts', {
        value: [],
      });
    }
  }, [register, selectedOption]);

  return (
    <div className={styles.root}>
      {!byAdmin && (
        <Fragment>
          <p className={styles.root__title}>
            Please set the fee percentage that the gallery takes from each artist's artwork sold
          </p>
          <div className={styles.root__wrapper}>
            {OPTIONS.map(({
              id,
              description,
            }) => (
              <FeeOption
                key={id}
                id={id}
                title={`Option ${id}`}
                description={description}
                selectedOption={selectedOption}
                selectOption={selectOption}
              />
            ))}
          </div>
        </Fragment>
      )}
      <form onSubmit={handleSubmit(onFormSuccess)}>
        {!byAdmin && (
          <div className={styles.root__fee}>
            {selectedOption !== 1 && (
              <EditableFeePaige option={selectedOption} register={register} watch={watch} setValue={setValue} />
            )}
            {!!logicError && (
              <h3 className={styles.root__fee_error}>
                {logicError}
              </h3>
            )}
          </div>
        )}
        <div className={styles.btn__root}>
          <button className={styles.btn__root__btn} type="submit">
            <img src={AcceptIcon} alt="" />
            Confirm
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

export default Approve;
