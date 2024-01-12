import { ITextFieldProps } from '@constants/types';

export const FIELDS: ITextFieldProps[] = [
  {
    element: 'input',
    label: 'Nickname* ',
    name: 'login',
    placeholder: 'Enter Your Nickname',
    maxLength: 45,
  },
  {
    element: 'input',
    label: 'First name*',
    name: 'name.first',
    placeholder: 'Enter Your Name',
    maxLength: 45,
  },
  {
    element: 'input',
    label: 'Last name*',
    name: 'name.last',
    placeholder: 'Enter Name',
    maxLength: 45,
  },
  {
    element: 'input',
    label: 'Email*',
    name: 'email',
    placeholder: 'john@example.com',
  },
];
