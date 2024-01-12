import * as yup from 'yup';

const schema = yup.object().shape({
  login: yup.string().required('Nickname is required field').max(45),
  name: yup.object({
    first: yup.string().required('First name is required field').max(45).matches(
      /^[a-zA-Z_-\s]*$/,
      'Maximal length of this field is 45 characters, only ( - ) allowed'
    ),
    last: yup.string().required('Last name is required field').max(45).matches(
      /^[a-zA-Z_-\s]*$/,
      'Maximal length of this field is 45 characters, only ( - ) allowed'
    ),
  }),
  email: yup.string().required('Email is required field').matches(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Entered email doesn’t match the template.'),
});

export default schema;
