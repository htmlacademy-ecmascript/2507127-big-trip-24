import { FilterType } from './const.js';
import { isEventExpired, isEventFuture, isEventActive } from './event.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventActive(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventExpired(event)),
};


export { filter };
