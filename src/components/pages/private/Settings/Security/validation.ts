import * as yup from 'yup';

const schema = yup.object().shape({
  current: yup.string().required('Fill current password'),
  password: yup.string().required('New Password is required field').matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/,
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
  ),
  confirm: yup.string().oneOf([yup.ref('password'), null], 'Confirmed password doesn’t match the entered password'),
});

export default schema;
