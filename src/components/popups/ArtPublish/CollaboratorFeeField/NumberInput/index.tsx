import { Fragment } from 'react';
import { Control, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { IAuctionPublishFormValues, IFixedPublishFormValues } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  name: keyof IFixedPublishFormValues | keyof IAuctionPublishFormValues;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  availableValue: number;
  readonly?: boolean;
  inputClassName?: string;
  messageClassName?: string;
}

const NumberInput = ({
  name,
  control,
  readonly,
  availableValue,
  inputClassName,
  messageClassName,
}: IProps) => (
  <Controller
    name={name}
    control={control}
    render={({
      field,
      fieldState: { error },
    }) => (
      <Fragment>
        <input
          {...field}
          step={1}
          type="number"
          readOnly={readonly}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={field.value ?? ''}
          onChange={(e) => {
            const prevValue = +(field.value || 0);

            if (readonly) return;

            if (e.target.value === '') {
              return field.onChange(e);
            }

            const value = +e.target.value;

            if (isNaN(value)) return;

            if (value < 0 || value > 100) return;

            if (value > prevValue && value >= value + availableValue) return;

            field.onChange(e.target.value);
          }}
          className={classNames(styles.root, inputClassName, error && styles.root__error)}
        />
        {error && (
          <p className={classNames(styles.root__message, messageClassName)}>{error.message}</p>
        )}
      </Fragment>
    )}
  />
);

export default NumberInput;
