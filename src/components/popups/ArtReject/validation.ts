import * as yup from 'yup';

const schema = yup.object().shape({
  reason: yup.string().required().min(10).max(500),
});

export default schema;
