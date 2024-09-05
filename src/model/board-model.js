import { getRandomPointEvent } from '../mock/point-events';

const EVENTS_COUNT = 4;

export default class BoardModel {
  events = Array.from({length: EVENTS_COUNT}, getRandomPointEvent);

  getEvents(){
    return this.events;
  }
}
