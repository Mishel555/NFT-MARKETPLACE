import * as yup from 'yup';

const schema = yup.object().shape({
  header: yup.string().required('Company header is required field').max(100),
  taxOffice: yup.string().required('Address is required field').max(100),
  description: yup.string().required('Description is required field').max(2500),
  website: yup.string(),
  email: yup.string().required('Email is required field').matches(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Entered email doesn’t match the template'),
});

export default schema;
