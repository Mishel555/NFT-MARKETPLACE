import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required field'),
  description: yup.string().max(2500, 'Maximal length of description is 2500 characters').required('Description is required field'),
  emotions: yup.array().min(1).max(5).required('Emotions is required field'),
  type: yup.string().required('Type is required field'),
});

export default schema;
