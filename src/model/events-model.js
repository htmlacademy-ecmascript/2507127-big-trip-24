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
}
