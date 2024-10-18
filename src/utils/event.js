import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function humanizeDate(date, format){
  return date ? dayjs(date).format(format) : '';
}

function getTimeDifference(dateFrom, dateTo) {
  const difference = dayjs(dateTo).diff(dateFrom);

  const msecInDay = 86400000;
  const msecInHour = 3600000;

  let eventDuration;

  switch(true){
    case(difference >= (msecInDay * 10)):
      eventDuration = dayjs.duration(difference).format('DD[D] HH[H] mm[M]').split(' ');
      eventDuration[0] = `${dayjs(dateTo).diff(dateFrom, 'day') }D`;
      eventDuration = eventDuration.join(' ');
      break;
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

function isEventFuture(event) {
  return event.dateFrom && dayjs().isBefore(event.dateFrom, 'D');
}

function isEventActive(event) {
  const areDatesExist = event.dateFrom && event.dateTo;
  const isDayBetweenDates = (dayjs().isSame(event.dateFrom, 'D') || dayjs().isAfter(event.dateFrom, 'D')) && dayjs().isBefore(event.dateTo, 'D');
  return areDatesExist && isDayBetweenDates ;
}

function isEventExpired (event) {
  return event.dateTo && dayjs().isAfter(event.dateTo, 'D');
}

function getCheckedOfferTitles(){
  const checkedOfferInputs = [...document.querySelectorAll('.event__offer-checkbox')].filter((input) => input.checked);
  const choosedOfferTitles = [];
  checkedOfferInputs.map((input) => choosedOfferTitles.push(input.dataset.offer));
  return choosedOfferTitles;
}

export { humanizeDate, getTimeDifference, isEventFuture, isEventExpired, isEventActive, getCheckedOfferTitles};
