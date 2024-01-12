import moment from 'moment';

const pad = (d: number): string => (d < 10) ? '0' + d.toString() : d.toString();

// returning converted time from seconds to provided type format.
// default type is 'HH:mm:ss'.
const useFormatSeconds = (seconds: number, type = 'HH:mm:ss'): string => {
  if (type === 'HH:mm:ss') {
    const floatPart = Math.round(+(seconds - Math.floor(seconds)).toFixed(2) * 10);
    return `${moment.utc(seconds * 1000).format(type)}:${pad(floatPart) === '10' ? '09' : pad(floatPart)}`;
  } else {
    return moment.utc(seconds * 1000).format(type);
  }
};

export default useFormatSeconds;
