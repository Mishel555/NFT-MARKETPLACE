import * as yup from 'yup';

const schema = yup.object().shape({
  price: yup.number().required('Price is required field')
    .min(0.0001, 'Price can not be lower than 0.0001')
    .typeError('Price can not be empty'),
  quantity: yup.number().required('Quantity is required field')
    .min(1, 'Quantity can not be lower than 1')
    .max(10000, 'Quantity can not be higher than 10000')
    .typeError('Quantity can not be empty'),
  membership: yup.string(),
  collaborators: yup.array().of(
    yup.object().shape({
      role: yup.string().required('Please fill out collaborator\'s role or remove it'),
      username: yup.string().required('Username is required'),
      fee: yup.number()
        .required('Fee is required field')
        .min(0, 'Min value is 0')
        .max(100, 'Max value is 100')
        .typeError('Collaborator fee is required field'),
      comment: yup.string().min(10, 'Min length of comment is 10').max(300, 'Max length of comment is 300'),
      feedback: yup.string().min(10, 'Min length of feedback is 10').max(300, 'Max length of feedback is 300'),
    }),
  ),
});

export default schema;
