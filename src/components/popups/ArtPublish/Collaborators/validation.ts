import * as yup from 'yup';

const schema = yup.object().shape({
  collaborators: yup.array().of(
    yup.object().shape({
      username: yup.string().required('Username is required'),
      fee: yup.number()
        .required('Fee is required field')
        .min(1, 'Min value is 1')
        .max(100, 'Max value is 100')
        .typeError('Collaborator fee is required field'),
      comment: yup.string().max(100, 'Max length of comment is 100'),
    }),
  ),
});

export default schema;
