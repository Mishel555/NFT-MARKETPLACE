import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().max(50, 'Max length of title 50 characters').required('Title is required field'),
  day: yup.string().required('Day is required field'),
  month: yup.string().required('Month is required field'),
  year: yup.string().required('Year is required field'),
  description: yup.string().max(600, 'Max length of description 600 characters'),
  city: yup.string().max(50, 'Max length of city 50 characters'),
  state: yup.string().max(50, 'Max length of state 50 characters'),
});

export default schema;
