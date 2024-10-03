import Observable from '../framework/observable';
import { getRandomMockPointEvent } from '../mock/mock-point-events';
import { getUniqueElements } from '../utils/common';


const EVENTS_COUNT = 5;

export default class EventsModel extends Observable{
  // #events = Array.from({length: EVENTS_COUNT}, getRandomMockPointEvent);
  #events = getUniqueElements(EVENTS_COUNT, getRandomMockPointEvent);

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
      update.eventData.event,
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

    this._notify(updateType, update);
  }
}
