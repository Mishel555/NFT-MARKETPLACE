import { ISettingsFormField } from '@constants/types';

const FIELDS: { [key: string]: ISettingsFormField[] } = {
  'Login details': [
    {
      label: 'Current password',
      name: 'current',
      type: 'password',
      placeholder: '**********',
    },
    {
      label: 'New password',
      name: 'password',
      type: 'password',
      placeholder: '**********',
    },
    {
      label: 'Confirm password',
      name: 'confirm',
      type: 'password',
      placeholder: '**********',
    },
  ],
};

export default FIELDS;
