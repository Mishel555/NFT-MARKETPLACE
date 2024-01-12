import * as yup from 'yup';

const IPREG = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const schema = yup.object().shape({
  title: yup.string().max(100, 'Maximal length of title is 100 characters').required('Title field is required'),
  ip: yup.string().matches(IPREG, 'Invalid IP address').required('IP address field is required'),
  description: yup.string().max(500, 'Maximal length of description is 500 characters').required('Description field is required'),
  location: yup.string().max(300, 'Maximal length of room address address is 300 characters').required('Address filed is required'),
  photos: yup.mixed(),
});

export default schema;
