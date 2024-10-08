import Observable from '../framework/observable';
import { getRandomMockPointEvent } from '../mock/mock-point-events';
import { getUniqueElements } from '../utils/common';


const EVENTS_COUNT = 5;

export default class EventsModel extends Observable{
  #eventsApiService = null;
  // #events = Array.from({length: EVENTS_COUNT}, getRandomMockPointEvent);
  #events = getUniqueElements(EVENTS_COUNT, getRandomMockPointEvent);

  constructor({eventsApiService}){
    super();
    this.#eventsApiService = eventsApiService;

    this.#eventsApiService.events.then((events) => {
      console.log(events.map(this.#adaptToClient));
    });
  }

  get events(){
    return this.#events;
  }

  updateEvent(updateType, update){
    const {eventData} = update;
    const index = this.#events.findIndex((event) => event.id === eventData.event.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update.eventData.event,
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update){
    this.#events = [
      update,
      ...this.#events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const {eventData} = update;
    const index = this.#events.findIndex((event) => event.id === eventData.event.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  #adaptToClient(event){
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
