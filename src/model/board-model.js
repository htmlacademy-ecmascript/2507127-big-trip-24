import { mockDestinations} from '../mock/mock-destinations';
import { mockOffers } from '../mock/mock-offers';
import { getRandomMockPointEvent} from '../mock/mock-point-events';
import { getUniqueElements } from '../utils/common';

const EVENTS_COUNT = 10;
export default class BoardModel {
  // #events = Array.from({length: EVENTS_COUNT}, getRandomMockPointEvent);
  #events = getUniqueElements(EVENTS_COUNT, getRandomMockPointEvent);
  #destinations = mockDestinations;
  #offers = mockOffers;

  get events(){
    return this.#events;
  }

  get destinations(){
    return this.#destinations;
  }

  get offers(){
    return this.#offers;
  }

  get allTypes(){
    const types = [];
    [...this.#offers].map((item) => types.push(item.type));
    return types;
  }

  getDestinationById(id) {
    return this.#destinations.find((item) => item.id === id);
  }

  getOffersByType(type) {
    return this.#offers.find((item) => item.type === type);
  }

  getOffersById(type, offersId) {
    const targetOffers = this.getOffersByType(type).offers;
    return targetOffers.filter((item) => offersId.find((id) => item.id === id));
  }

  getEventData(event) {
    return {
      event,
      offers: [...this.getOffersById(event.type, event.offers)],
      destination: this.getDestinationById(event.destination)
    };
  }
}
