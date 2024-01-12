import * as yup from 'yup';

const schema = yup.object().shape({
  cause: yup.string().required('Cause is required field')
    .min(100, 'The length of this field should be from 100 to 2000 characters')
    .max(2000, 'The length of this field should be from 100 to 2000 characters'),
});

export default schema;
