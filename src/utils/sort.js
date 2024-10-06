import dayjs from 'dayjs';
import { SortType } from './const';


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

function sortEventsData(events, sortType){
  switch(sortType){
    case SortType.DAY:
      return [...events].sort(sortByDay);
    case SortType.EVENT:
      return [...events].sort(sortByEvent);
    case SortType.TIME:
      return [...events].sort(sortByTime);
    case SortType.PRICE:
      return [...events].sort(sortByPrice);
    case SortType.OFFERS:
      return [...events].sort(sortByOffers);
  }
}

export { sortEventsData };
