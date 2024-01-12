import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().max(2500, 'Maximal length of description is 2500 characters').required(),
  emotions: yup.array().min(1).max(5).required('Emotions is required field').typeError('Emotions is required field'),
  type: yup.string().required('Type is required field'),
});

export default schema;
