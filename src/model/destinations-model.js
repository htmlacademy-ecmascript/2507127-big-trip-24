import { mockDestinations } from '../mock/mock-destinations';


export default class DestinationsModel{
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }

  get destinationNames(){
    return this.destinations.map((destination) => destination.name);
  }

  getDestinationById(id) {
    return this.#destinations.find((item) => item.id === id);
  }
}
