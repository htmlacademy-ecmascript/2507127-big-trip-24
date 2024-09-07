import { mockDestinations} from '../mock/mock-destinations';
import { mockOffers } from '../mock/mock-offers';
import { getRandomMockPointEvent } from '../mock/mock-point-events';

const EVENTS_COUNT = 4;

export default class BoardModel {
  events = Array.from({length: EVENTS_COUNT}, getRandomMockPointEvent);
  destinations = mockDestinations;
  offers = mockOffers;

  getEvents(){
    return this.events;
  }

  getDestinations(){
    return this.destinations;
  }

  getOffers(){
    return this.offers;
  }

  getAllTypes(){
    const types = [];
    [...this.offers].map((item) => types.push(item.type));
    return types;
  }

  getDestinationById(id) {
    return this.destinations.find((item) => item.id === id);
  }

  getOffersByType(type) {
    return this.offers.find((item) => item.type === type);
  }

  getOffersById(type, offersId) {
    const targetOffers = this.getOffersByType(type).offers;
    return targetOffers.filter((item) => offersId.find((id) => item.id === id));
  }

  getEventData(event, model) {
    return {
      event,
      offers: [...model.getOffersById(event.type, event.offers)],
      destination: model.getDestinationById(event.destination)
    };
  }
}
