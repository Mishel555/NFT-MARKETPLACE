import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().max(100, 'Maximal length of category is 100 characters').required('All fields are required'),
});

export default schema;
