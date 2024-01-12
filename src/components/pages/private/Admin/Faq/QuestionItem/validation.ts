import * as yup from 'yup';

const schema = yup.object().shape({
  question: yup.string().max(300, 'Maximal length of FAQ Question is 300 characters').required('All fields are required'),
  answer: yup.string().max(2500, 'Maximal length of FAQ Answer is 2500 characters').required('All fields are required'),
});

export default schema;
