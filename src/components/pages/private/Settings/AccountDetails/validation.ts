import * as yup from 'yup';

const schemas = {
  user: yup.object().shape({
    login: yup.string().required('Login is required field').max(45, 'Maximal length of login is 45'),
    email: yup.string().required('Email is required field').matches(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Entered email doesn’t match the template'),
    name: yup.object({
      first: yup.string().required('First name is required field').max(45).matches(
        /^[a-zA-Z_-\s]*$/,
        'Maximal length of this field is 45 characters, only ( - ) allowed',
      ),
      last: yup.string().required('Last name is required field').max(45).matches(
        /^[a-zA-Z_-\s]*$/,
        'Maximal length of this field is 45 characters, only ( - ) allowed',
      ),
    }),
    phone: yup.string().max(20, 'Maximal length of phone is 20'),
    dateOfBirth: yup.string(),
    address: yup.string().max(100, 'Maximal length of Studio address is 100'),
  }),
  gallery: yup.object().shape({
    header: yup.string().required('Login is required field').max(45, 'Maximal length of header is 45'),
    taxOffice: yup.string().required('Address is required field').max(100, 'Maximal length of taxOffice is 100'),
    description: yup.string().required('Description is required field').max(2500, 'Maximal length of description is 1000'),
    email: yup.string().required('Email is required field').matches(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Entered email doesn’t match the template'),
    fullName: yup.string(),
    phone: yup.string().max(20, 'Maximal length of phone is 20'),
    dateOfBirth: yup.string(),
    address: yup.string().max(100, 'Maximal length of Studio address is 100'),
    about: yup.string().max(1200),
    manifesto: yup.string().max(1200),
    website: yup.string(),
  }),
  artist: yup.object().shape({
    login: yup.string().required('Login is required field').max(45, 'Maximal length of login is 45'),
    email: yup.string().required('Email is required field').matches(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Entered email doesn’t match the template'),
    manifesto: yup.string().max(1200),
    name: yup.object({
      first: yup.string().required('First name is required field').max(45).matches(
        /^[a-zA-Z_-\s]*$/,
        'Maximal length of this field is 45 characters, only ( - ) allowed',
      ),
      last: yup.string().required('Last name is required field').max(45).matches(
        /^[a-zA-Z_-\s]*$/,
        'Maximal length of this field is 45 characters, only ( - ) allowed',
      ),
    }),
    phone: yup.string().max(20, 'Maximal length of phone is 20'),
    dateOfBirth: yup.string(),
    address: yup.string().max(100, 'Maximal length of Studio address is 100'),
    bio: yup.string().max(150),
    about: yup.string().max(1200, 'Artist bio max is 1200'),
    portfolio: yup.string().required('Portfolio is required field'),
  }),
  admin: yup.object().shape({
    login: yup.string().required('Login is required field').max(45, 'Maximal length of login is 45'),
    email: yup.string().required('Email is required field').matches(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Entered email doesn’t match the template'),
    name: yup.object({
      first: yup.string().required('First name is required field').max(45).matches(
        /^[a-zA-Z_-\s]*$/,
        'Maximal length of this field is 45 characters, only ( - ) allowed',
      ),
      last: yup.string().required('Last name is required field').max(45).matches(
        /^[a-zA-Z_-\s]*$/,
        'Maximal length of this field is 45 characters, only ( - ) allowed',
      ),
    }),
    phone: yup.string().max(20, 'Maximal length of phone is 20'),
    dateOfBirth: yup.string(),
    address: yup.string().max(100, 'Maximal length of Studio address is 100'),
  }),
};

export default schemas;
