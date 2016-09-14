import Moment from 'moment';

function getTime(timestamp) {
  if (!timestamp) return false;

  return Moment(timestamp).calendar(null, {
    lastDay: '[Yesterday]',
    sameDay: 'LT',
    lastWeek: 'dddd',
    sameElse: 'DD/MM/YY',
  });
}

export default getTime;
