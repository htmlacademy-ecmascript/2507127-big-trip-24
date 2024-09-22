import { mockDestinations } from '../mock/mock-destinations';


export default class DestinationsModel{
  #destinations = mockDestinations;

  getDestinationById(id) {
    return this.#destinations.find((item) => item.id === id);
  }
}
