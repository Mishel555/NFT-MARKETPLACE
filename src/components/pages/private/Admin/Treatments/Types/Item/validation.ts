import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().max(100, 'Maximal length of type is 100 characters').required('All fields are required'),
});

export default schema;
