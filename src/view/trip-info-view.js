import AbstractView from '../framework/view/abstract-view.js';
import { sortEventsData } from '../utils/sort.js';
import { SortType } from '../utils/const.js';

function createTripInfoTitlesTemplate(){
  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
    </div>
  `;
}

function createTripInfoCostTemplate(){
  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  `;
}

function createTripInfoTemplate(){
  return `
    <section class="trip-main__trip-info  trip-info">
      ${createTripInfoTitlesTemplate()}
      ${createTripInfoCostTemplate()}
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #events = [];
  #offers = [];
  #destinations = [];

  constructor({events, offers, destinations}){
    super();

    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate();
  }
}
