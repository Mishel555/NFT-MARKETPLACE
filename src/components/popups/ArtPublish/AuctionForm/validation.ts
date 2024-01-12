import * as yup from 'yup';

const minDate = new Date();
const maxDate = new Date();

minDate.setMinutes(minDate.getMinutes() + 15);
maxDate.setMonth(maxDate.getMonth() + 1);

const schema = yup.object().shape({
  endDate: yup.date().transform(value => new Date(value))
    .min(minDate, 'The auction has a minimum duration of 15m and a maximum duration of 30 days')
    .max(maxDate, 'The auction has a minimum duration of 15m and a maximum duration of 30 days')
    .required('Duration is required field')
    .typeError('Invalid Duration'),
  startPrice: yup.number().min(0, 'Starting price cannot be lower than 0')
    .required('Starting price is required field')
    .typeError('Invalid Starting price'),
  minimumPrice: yup.string()
    .test(
      'min',
      'Reserve price must be more than start price',
      (value, context) => {
        if (value === undefined || value === '' || !context.parent.startPrice) return true;

        const startPrice = +context.parent.startPrice;

        return (+value > startPrice);
      },
    ),
  buyNowPrice: yup.string()
    .test(
      'min',
      'Max price must be 40% more than start price',
      (value, context) => {
        if (value === undefined || value === '' || !context.parent.startPrice) return true;

        const startPrice = +context.parent.startPrice;

        return (+value >= startPrice + startPrice * 0.4);
      },
    )
    .test(
      'max',
      'Max price must be more than reserve price',
      (value, context) => {
        if (value === undefined || value === '' || !context.parent.minimumPrice) return true;
        const reservePrice = +context.parent.minimumPrice;

        return (+value > reservePrice);
      },
    ),
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
