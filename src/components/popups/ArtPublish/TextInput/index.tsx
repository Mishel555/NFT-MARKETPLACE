import { Fragment } from 'react';
import { Control, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { IAuctionPublishFormValues, IFixedPublishFormValues } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  element?: 'input' | 'textarea';
  name: keyof IFixedPublishFormValues | keyof IAuctionPublishFormValues;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  readonly?: boolean;
  inputClassName?: string;
  messageClassName?: string;
}

const TextInput = ({
  element = 'input',
  name,
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
        {(() => {
          switch (element) {
            case 'input':
              return (
                <input
                  {...field}
                  type="text"
                  readOnly={readonly}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  value={field.value || ''}
                  className={classNames(styles.root, inputClassName, error && styles.root__error)}
                />
              );
            case 'textarea':
              return (
                <textarea
                  {...field}
                  readOnly={readonly}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  value={field.value || ''}
                  className={classNames(styles.root, styles.root__area, inputClassName, error && styles.root__error)}
                />
              );
          }
        })()}
        {error && (
          <p className={classNames(styles.root__message, messageClassName)}>{error.message}</p>
        )}
      </Fragment>
    )}
  />
);

export default TextInput;
