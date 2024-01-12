import { useState } from 'react';
import { Control } from 'react-hook-form';
import Switch from 'react-switch';
import { IAuctionPublishFormValues, IFixedPublishFormValues } from '@constants/types';
import TextInput from '../TextInput';
import styles from './style.module.scss';

interface IProps {
  name: string;
  allowSwitch?: boolean;
  control: Control<IFixedPublishFormValues | IAuctionPublishFormValues>;
  destroyValue: () => void;
}

const CommentField = ({ name, allowSwitch, destroyValue, control }: IProps) => {
  const [enabled, setEnabled] = useState<boolean>(!allowSwitch);

  const onChange = (checked: boolean) => {
    if (!checked) {
      destroyValue();
    }

    setEnabled(checked);
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        {allowSwitch && (
          <Switch
            checked={enabled}
            width={50}
            height={25}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#7A52F4"
            offColor="#CFDBD5"
            offHandleColor="#fff"
            handleDiameter={16}
            onChange={onChange}
          />
        )}
        <span className={styles.root__label}>Comment</span>
      </div>
      {enabled && (
        <TextInput
          control={control}
          element="textarea"
          name={name as keyof IFixedPublishFormValues | keyof IAuctionPublishFormValues}
        />
      )}
    </div>
  );
};

export default CommentField;
