import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function humanizeDate(date, format){
  return date ? dayjs(date).format(format) : '';
}

function getTimeDifference(dateFrom, dateTo) {
  const difference = dayjs(dateTo).diff(dayjs(dateFrom));

  const msecInDay = 86400000;
  const msecInHour = 3600000;

  let eventDuration;

  switch(true){
    case(difference >= msecInDay):
      eventDuration = dayjs.duration(difference).format('DD[D] HH[H] mm[M]');
      break;
    case(difference >= msecInHour):
      eventDuration = dayjs.duration(difference).format('HH[H] mm[M]');
      break;
    case(difference < msecInHour):
      eventDuration = dayjs.duration(difference).format('mm[M]');
      break;
  }

  return eventDuration;
}

function isEventExpired(dueDate){
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

export { humanizeDate, isEventExpired, getTimeDifference };
