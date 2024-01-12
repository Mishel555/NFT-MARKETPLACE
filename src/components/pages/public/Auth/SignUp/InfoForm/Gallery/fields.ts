import { ITextFieldProps } from '@constants/types';

export const FIELDS: ITextFieldProps[] = [
  {
    element: 'input',
    label: 'Company header*',
    name: 'header',
    placeholder: 'Enter Your company header',
    maxLength: 100,
  },
  {
    element: 'input',
    label: 'Address*',
    name: 'taxOffice',
    placeholder: 'Enter Your Address',
    maxLength: 100,
  },
  {
    element: 'textarea',
    label: 'Description of the gallery*',
    name: 'description',
    placeholder: 'Enter Your description',
    maxLength: 2500,
  },
  {
    element: 'input',
    label: 'Own website link',
    name: 'website',
    placeholder: 'https://',
  },
  {
    element: 'input',
    label: 'Email*',
    name: 'email',
    placeholder: 'john@example.com',
  },
];
