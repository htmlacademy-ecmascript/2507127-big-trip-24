import AbstractView from '../framework/view/abstract-view.js';
import { getTimeDifference, humanizeDate } from '../utils/event.js';
import { TimeFormat } from '../utils/const.js';

function createOffersListTemplate({title, price}){
  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `;
}

function createEventDateTemplate({dateFrom}) {
  return `
    <time class="event__date" datetime=${humanizeDate(dateFrom, TimeFormat.DATE_FULL)}>${humanizeDate(dateFrom, TimeFormat.DATE)}</time>
  `;
}

function createEventTypeTemplate({type}) {

  return `
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
  `;
}

function createEventTitleTemplate(event, destination) {

  return `
    <h3 class="event__title">${event.type} ${destination.name}</h3>
  `;
}

function createEventScheduleTemplate({dateFrom, dateTo}){
  const timeDifference = getTimeDifference(dateFrom, dateTo);

  return `
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${humanizeDate(dateFrom, TimeFormat.DATETIME_FULL)}>${humanizeDate(dateFrom, TimeFormat.TIME)}</time>
        &mdash;
        <time class="event__end-time" datetime=${humanizeDate(dateTo, TimeFormat.DATETIME_FULL)}>${humanizeDate(dateTo, TimeFormat.TIME)}</time>
      </p>
      <p class="event__duration">${timeDifference}</p>
    </div>
  `;
}

function createEventPriceTemplate({basePrice}) {

  return `
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
  `;
}

function createEventOffersTemplate(offers) {
  const offersList = offers.map((offer) => createOffersListTemplate(offer)).join('');

  return `
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers.length ? offersList : ''}
    </ul>
  `;
}

function createEventButtonsTemplate({isFavorite}) {
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

function createEventItemTemplate({event, offers, destination}) {
  return ` <li class="trip-events__item">
              <div class="event">
                ${createEventDateTemplate(event)}
                ${createEventTypeTemplate(event)}
                ${createEventTitleTemplate(event, destination)}
                ${createEventScheduleTemplate(event)}
                ${createEventPriceTemplate(event)}
                ${createEventOffersTemplate(offers)}
                ${createEventButtonsTemplate(event)}
              </div>
            </li>
            `;
}

export default class EventItemView extends AbstractView{
  #eventData = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({eventData, onEditClick, onFavoriteClick}) {
    super();
    this.#eventData = eventData;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.setEventListeners();
  }

  get template() {
    return createEventItemTemplate(this.#eventData);
  }

  setEventListeners(){
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
