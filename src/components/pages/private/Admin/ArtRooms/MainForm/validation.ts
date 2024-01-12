import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().max(100, 'Maximal length of title is 100 characters').required('Title field is required'),
  description: yup.string().max(2500, 'Maximal length of description is 2500 characters').required('Description field is required'),
});

export default schema;
