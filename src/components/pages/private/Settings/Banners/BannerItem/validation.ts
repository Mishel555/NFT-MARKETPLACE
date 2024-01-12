import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.object({
    label: yup.string().max(50, 'Title max length is 50'),
    color: yup.string(),
  }),
  description: yup.object({
    label: yup.string().max(600, 'Description max length is 600'),
    color: yup.string(),
  }),
  countdown: yup.object({
    color: yup.string(),
    endDate: yup.string(),
  }),
  buttonName: yup.string().max(50, 'Button max length is 50'),
  url: yup.string(),
});

export default schema;
