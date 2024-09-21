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

function sortByDay(dayA, dayB) {
  return dayjs(dayA.dateFrom).diff(dayjs(dayB.dateFrom));
}

function sortByEvent(eventA, eventB) {
  return eventA.type.localeCompare(eventB.type);
}

function sortByTime(timeA, timeB){
  const durationA = dayjs(timeA.dateFrom).diff(dayjs(timeA.dateTo));
  const durationB = dayjs(timeB.dateFrom).diff(dayjs(timeB.dateTo));
  return dayjs(durationA).diff(durationB);
}

function sortByPrice(priceA, priceB) {
  return priceB.basePrice - priceA.basePrice;
}

function sortByOffers(offersA, offersB) {
  return offersB.offers.length - offersA.offers.length;
}


export { humanizeDate, getTimeDifference, isEventFuture, isEventExpired, isEventActive, sortByDay, sortByEvent, sortByTime, sortByPrice, sortByOffers };
