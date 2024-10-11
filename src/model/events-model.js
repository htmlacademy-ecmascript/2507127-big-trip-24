import Observable from '../framework/observable';
import { UpdateType } from '../utils/const';

export default class EventsModel extends Observable{
  #eventsApiService = null;
  #offersModel = null;
  #destinationsModel = null;
  #events = [];

  constructor({eventsApiService, offersModel, destinationsModel}){
    super();
    this.#eventsApiService = eventsApiService;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get events(){
    return this.#events;
  }

  async init(){
    try {
      await this.#offersModel.init();
      await this.#destinationsModel.init();
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch (error) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, update){
    const {eventData} = update;
    const index = this.#events.findIndex((event) => event.id === eventData.event.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(eventData.event);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1)
      ];

      update.eventData.event = updatedEvent;
      this._notify(updateType, update);
    } catch (error) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update){
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent,...this.#events];

      this._notify(updateType, newEvent);
    } catch (error) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const {eventData} = update;
    const index = this.#events.findIndex((event) => event.id === eventData.event.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(eventData.event);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1)
      ];

      this._notify(updateType);
    } catch (error) {
      throw new Error('Can\'t delete event');
    }
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
