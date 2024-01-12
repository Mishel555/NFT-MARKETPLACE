import { AIS_ADDRESS } from '@constants/contacts';
import { ISettingsFormField } from '@constants/types';

const FIELDS: {
  [key: string]: {
    [key: string]: ISettingsFormField[];
  };
} = {
  user: {
    'Account information': [
      {
        label: 'Username',
        name: 'login',
        type: 'text',
        placeholder: '@sebastianbennett',
      },
      {
        label: 'First name',
        name: 'name.first',
        type: 'text',
        placeholder: 'Bennett',
      },
      {
        label: 'Last name',
        name: 'name.last',
        type: 'text',
        placeholder: 'Sebastian',
      },
      {
        label: 'Date of birth',
        name: 'dateOfBirth',
        type: 'date',
        placeholder: '2002-09-18',
      },
    ],
    'Contact details': [
      {
        label: 'Email address',
        name: 'email',
        type: 'text',
        placeholder: 'seb.bennett@gmail.com',
      },
      {
        label: 'Phone number',
        name: 'phone',
        type: 'tel',
        placeholder: '+995 590 558 124',
      },
      {
        label: 'Studio address',
        name: 'address',
        type: 'text',
        placeholder: AIS_ADDRESS,
      },
    ],
  },
  gallery: {
    'Account information': [
      {
        label: 'Company name',
        name: 'header',
        type: 'text',
        placeholder: '@sebastianbennett',
      },
      {
        label: 'Description',
        name: 'description',
        type: 'area',
        placeholder: 'Description of gallery',
      },
      {
        label: 'About Company',
        name: 'about',
        type: 'area',
        placeholder: 'About Us',
      },
      {
        label: 'Manifesto',
        name: 'manifesto',
        type: 'area',
        placeholder: 'manifesto',
      },
      {
        label: 'Address',
        name: 'taxOffice',
        type: 'text',
        placeholder: '2002-09-18',
      },
      {
        label: 'Website',
        name: 'website',
        type: 'text',
        placeholder: 'Your website here...',
      },
    ],
    'Contact details': [
      {
        label: 'Email address',
        name: 'email',
        type: 'text',
        placeholder: 'seb.bennett@gmail.com',
      },
      {
        label: 'Phone number',
        name: 'phone',
        type: 'tel',
        placeholder: '+995 590 558 124',
      },
      {
        label: 'Studio address',
        name: 'address',
        type: 'text',
        placeholder: AIS_ADDRESS,
      },
    ],
  },
  artist: {
    'Account information': [
      {
        label: 'Username',
        name: 'login',
        type: 'text',
        placeholder: '@sebastianbennett',
      },
      {
        label: 'First name',
        name: 'name.first',
        type: 'text',
        placeholder: 'Bennett',
      },
      {
        label: 'Last name',
        name: 'name.last',
        type: 'text',
        placeholder: 'Sebastian',
      },
      {
        label: 'Date of birth',
        name: 'dateOfBirth',
        type: 'date',
        placeholder: '2002-09-18',
      },
      {
        label: 'Artistic Manifesto',
        name: 'manifesto',
        type: 'area',
        placeholder: 'Manifesto',
      },
      {
        label: 'Artist Bio',
        name: 'about',
        type: 'area',
        placeholder: 'Artist bio',
      },
      {
        label: 'Bio',
        name: 'bio',
        type: 'area',
        placeholder: 'Biography of Artist',
      },
      {
        label: 'Portfolio',
        name: 'portfolio',
        type: 'text',
        placeholder: 'Your portfolio here...',
      },
    ],
    'Contact details': [
      {
        label: 'Email address',
        name: 'email',
        type: 'text',
        placeholder: 'seb.bennett@gmail.com',
      },
      {
        label: 'Phone number',
        name: 'phone',
        type: 'tel',
        placeholder: '+995 590 558 124',
      },
      {
        label: 'Studio address',
        name: 'address',
        type: 'text',
        placeholder: AIS_ADDRESS,
      },
    ],
  },
  admin: {
    'Account information': [
      {
        label: 'Username',
        name: 'login',
        type: 'text',
        placeholder: '@sebastianbennett',
      },
      {
        label: 'First name',
        name: 'name.first',
        type: 'text',
        placeholder: 'Bennett',
      },
      {
        label: 'Last name',
        name: 'name.last',
        type: 'text',
        placeholder: 'Sebastian',
      },
      {
        label: 'Date of birth',
        name: 'dateOfBirth',
        type: 'date',
        placeholder: '2002-09-18',
      },
    ],
    'Contact details': [
      {
        label: 'Email address',
        name: 'email',
        type: 'text',
        placeholder: 'seb.bennett@gmail.com',
      },
      {
        label: 'Phone number',
        name: 'phone',
        type: 'tel',
        placeholder: '+995 590 558 124',
      },
      {
        label: 'Studio address',
        name: 'address',
        type: 'text',
        placeholder: AIS_ADDRESS,
      },
    ],
  },
};

export default FIELDS;
