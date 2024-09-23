import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {TimeFormat } from '../utils/const.js';
import { humanizeDate } from '../utils/event.js';


function createEventTypeItemTemplate(type) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>
  `;
}

function createFormHeaderTypeTemplate(event, allTypes){
  const eventTypeList = allTypes.map((type) => createEventTypeItemTemplate(type)).join('');

  return `
    <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${eventTypeList}
                      </fieldset>
                    </div>
                  </div>
  `;
}

function createDestinationOptionTemplate(destination) {
  return `<option value="${destination}"></option>`;
}

function createFormHeaderEventNameTemplate(event, destination, destinationNames){
  const destinationOptions = destinationNames.map((destinationName) => createDestinationOptionTemplate(destinationName)).join('');

  return `
    <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${event.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationOptions}
                    </datalist>
                  </div>
  `;
}

function createFormHeaderTimeTemplate(event){
  const startTime = humanizeDate(event.dateFrom, TimeFormat.FORM_EDIT);
  const endTime = humanizeDate(event.dateTo, TimeFormat.FORM_EDIT);

  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
    </div>
  `;
}

function createFormHeaderPriceTemplate({basePrice}){
  return `
    <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>
  `;
}

function createFormHeaderButtonsTemplate(){
  return `
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  `;
}

function createFormHeaderTemplate(event, destination, allTypes, destinationNames) {

  return `
    <header class="event__header">
                  ${createFormHeaderTypeTemplate(event, allTypes)}
                  ${createFormHeaderEventNameTemplate(event, destination, destinationNames)}
                  ${createFormHeaderTimeTemplate(event)}
                  ${createFormHeaderPriceTemplate(event)}
                  ${createFormHeaderButtonsTemplate()}
                </header>
  `;
}

function createEventOfferTemplate(offer){
  return `
    <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-1" type="checkbox" name="event-offer-${offer.name}">
                        <label class="event__offer-label" for="event-offer-${offer.name}-1">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>
  `;
}

function createEventPhotoTemplate({src, description}){
  return `<img class="event__photo" src=${src} alt="${description}">`;
}

function createEventPhotoContainerTemplate(pictures){
  const photoList = pictures.map((item) => createEventPhotoTemplate(item)).join('');

  return `
    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${photoList}
                      </div>
                    </div>
  `;
}

function createEventDestinationTemplate({description, pictures}) {

  return `
    <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    ${pictures.length > 0 ? createEventPhotoContainerTemplate(pictures) : ''}
                  </section>
  `;
}

function createOfferListTemplate(offerList) {
  return `
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
                      ${offerList}
                    </div>
  `;
}

function createEventDetailsTemplate(offerList, destination) {
  return `
      <section class="event__details">
                  <section class="event__section  event__section--offers">
                    ${offerList.length ? createOfferListTemplate(offerList) : '' }
                  </section>
                  ${destination}
                </section>
  `;
}

function createFormAddEventTemplate({eventData, currentOffers, allTypes, destinationNames, currentDestination}) {
  const {event, destination} = eventData;
  const offerList = currentOffers.map((offer) => createEventOfferTemplate(offer)).join('');

  return `
    <form class="event event--edit" action="#" method="post">
      ${createFormHeaderTemplate(event, destination, allTypes, destinationNames)}
      ${createEventDetailsTemplate(offerList, createEventDestinationTemplate(currentDestination))}
    </form>
  `;
}


export default class FormEditEventView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #handleFormClose = null;

  #currentDestination = null;
  #currentOffers = null;
  _currentEventType = null;

  constructor({eventData, allOffers, allTypes, destinations, destinationNames, onFormSubmit, onFormClose}) {
    super();

    this.#currentDestination = destinations.find((currentData) => currentData.name === eventData.destination.name);
    this.#currentOffers = allOffers.find((currentData) => currentData.type === eventData.event.type).offers;

    this._setState(FormEditEventView.parseEventToState({
      eventData,
      allTypes,
      destinations,
      destinationNames,
      currentOffers: this.#currentOffers,
      currentDestination: this.#currentDestination}));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;

    this.#setEventListeners();
  }

  get template() {
    return createFormAddEventTemplate(this._state);
  }

  static parseEventToState(event){
    return {...event};
  }

  static parseStateToEvent(state, currentEventType){
    const event = {...state};

    if (currentEventType) {
      event.eventData.event.type = currentEventType;
    }

  }

  _restoreHandlers(){
    this.#setEventListeners();
  }

  #setEventListeners() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);

    this.element.querySelector('.event__type-group').addEventListener('click', this.#formChangeTypeHandler);
  }

  #formChangeTypeHandler = (evt) => {
    const targetInput = evt.target.closest('.event__type-input');
    if (targetInput) {
      this.element.querySelector('.event__type-toggle').value = targetInput.value;
      this._currentEventType = targetInput.value;
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditEventView.parseStateToEvent(this._state, this._currentEventType));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };
}
