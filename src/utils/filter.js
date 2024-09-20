import { FiltersEvent } from './const.js';
import { isEventExpired, isEventFuture, isEventActive } from './date.js';

const filter = {
  [FiltersEvent.EVERYTHING]: (events) => events,
  [FiltersEvent.FUTURE]: (events) => events.filter((event) => isEventFuture(event)),
  [FiltersEvent.PRESENT]: (events) => events.filter((event) => isEventActive(event)),
  [FiltersEvent.PAST]: (events) => events.filter((event) => isEventExpired(event)),
};


export { filter };
