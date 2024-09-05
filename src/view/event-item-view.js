import { createElement } from '../render.js';
import { humanizeDate } from '../utils.js';
import { TimeFormat } from '../const.js';

function createOffersListTemplate(offer){
  const { title, price } = offer;

  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `;
}

const renderOffersList = (event) => event.offers.map((offer) => createOffersListTemplate(offer)).join('');

function createEventDateTemplate(event) {
  const {dateFrom} = event;

  return `
    <time class="event__date" datetime=${humanizeDate(dateFrom, TimeFormat.DATE_FULL)}>${humanizeDate(dateFrom, TimeFormat.DATE)}</time>
  `;
}

function createEventTypeTemplate(event) {
  const { type } = event;

  return `
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
  `;
}

function createEventTitleTemplate(event) {
  const { destination, type } = event;

  return `
    <h3 class="event__title">${type} ${destination.name}</h3>
  `;
}

function createEventScheduleTemplate(event){
  const {dateFrom, dateTo} = event;

  return `
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${humanizeDate(dateFrom, TimeFormat.DATETIME_FULL)}>${humanizeDate(dateFrom, TimeFormat.TIME)}</time>
        &mdash;
        <time class="event__end-time" datetime=${humanizeDate(dateFrom, TimeFormat.DATETIME_FULL)}>${humanizeDate(dateTo, TimeFormat.TIME)}</time>
      </p>
      <p class="event__duration">???</p>
    </div>
  `;
}

function createEventPriceTemplate(event) {
  const { basePrice } = event;

  return `
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
  `;
}

function createEventOffersTemplate(event) {
  const { offers } = event;

  return `
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers.length ? renderOffersList(event) : ''}
    </ul>
  `;
}

function createEventButtonsTemplate(event) {
  const { isFavorite } = event;

  return `
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  `;
}

function createEventItemTemplate(event) {
  return ` <li class="trip-events__item">
              <div class="event">
                ${createEventDateTemplate(event)}
                ${createEventTypeTemplate(event)}
                ${createEventTitleTemplate(event)}
                ${createEventScheduleTemplate(event)}
                ${createEventPriceTemplate(event)}
                ${createEventOffersTemplate(event)}
                ${createEventButtonsTemplate(event)}
              </div>
            </li>
            `;
}

export default class EventItemView{
  constructor({event}) {
    this.event = event;
  }

  getTemplate() {
    return createEventItemTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
