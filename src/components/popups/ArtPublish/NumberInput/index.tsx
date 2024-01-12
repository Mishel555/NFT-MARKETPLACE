import { Fragment } from 'react';
import { Control, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { IAuctionPublishFormValues, IFixedPublishFormValues } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  name: keyof IFixedPublishFormValues | keyof IAuctionPublishFormValues;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
  inputClassName?: string;
  messageClassName?: string;
}

const NumberInput = ({
  min,
  max,
  name,
  step,
  control,
  readonly,
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
          type="number"
          step={step}
          readOnly={readonly}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={field.value ?? ''}
          onChange={(e) => {
            if (readonly) return;

            const value = +e.target.value;

            if (max !== undefined && value > max || value < (min || 0) || isNaN(value)) return;

            if (e.target.value === '') {
              return field.onChange(e);
            }

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
