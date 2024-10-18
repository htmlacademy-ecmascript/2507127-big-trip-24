
export default class DestinationsModel {
  #eventsApiService = null;
  #destinations = [];


  constructor({eventsApiService}){
    this.#eventsApiService = eventsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  get destinationNames(){
    return this.destinations.map((destination) => destination.name);
  }

  async init(){
    try {
      this.#destinations = await this.#eventsApiService.destinations;
    } catch (error) {
      this.#destinations = [];
    }
  }

  getDestinationById(id) {
    return this.#destinations.find((item) => item.id === id);
  }
}
