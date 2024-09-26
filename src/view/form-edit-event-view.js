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

function createFormHeaderTypeTemplate(event, allTypes, currentEventType){
  const eventTypeList = allTypes.map((type) => createEventTypeItemTemplate(type)).join('');

  return `
    <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${currentEventType || event.type}.png" alt="Event type icon">
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

function createFormHeaderEventNameTemplate(event, destination, destinationNames, currentEventType, currentDestinationName){
  const destinationOptions = destinationNames.map((destinationName) => createDestinationOptionTemplate(destinationName)).join('');

  //На случай, если пользователь введет название пункта назначения отсутствующего в списке
  let destinationValue;
  if (currentDestinationName) {
    destinationValue = destinationNames.some((name) => name === currentDestinationName) ? currentDestinationName : null;
  }

  return `
    <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${currentEventType || event.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationValue || destination.name}" list="destination-list-1">
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

function createFormHeaderTemplate(event, destination, allTypes, destinationNames, currentEventType, currentDestinationName) {

  return `
    <header class="event__header">
                  ${createFormHeaderTypeTemplate(event, allTypes, currentEventType)}
                  ${createFormHeaderEventNameTemplate(event, destination, destinationNames, currentEventType, currentDestinationName)}
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

function createFormAddEventTemplate({eventData, typeOffers, allOffers, allTypes, destinationNames, currentDestinationName, destinations, currentEventType}) {
  const {event, destination} = eventData;

  let updatedOffers, initialOffers;

  const getCurrentOffers = (offers) => offers.map((offer) => createEventOfferTemplate(offer)).join('');

  if (currentEventType) {
    const actualOffers = allOffers.find((offers) => offers.type === currentEventType).offers;
    updatedOffers = getCurrentOffers(actualOffers) || [];
  } else {
    initialOffers = getCurrentOffers(typeOffers);
  }

  const offersList = updatedOffers || initialOffers;

  let updatedDestination;
  if (currentDestinationName) {
    updatedDestination = destinations.find((currentData) => currentData.name === currentDestinationName);
  }

  return `
    <form class="event event--edit" action="#" method="post">
      ${createFormHeaderTemplate(event, destination, allTypes, destinationNames, currentEventType, currentDestinationName)}
      ${createEventDetailsTemplate(offersList, createEventDestinationTemplate(updatedDestination || destination))}
    </form>
  `;
}


export default class FormEditEventView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #handleFormClose = null;

  constructor({eventData, allOffers, typeOffers, allTypes, destinations, destinationNames, onFormSubmit, onFormClose}) {
    super();

    this._setState(FormEditEventView.parseEventToState({
      eventData,
      allTypes,
      destinations,
      destinationNames,
      typeOffers,
      allOffers,
    }));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return createFormAddEventTemplate(this._state);
  }

  static parseEventToState(event){
    return {...event};
  }

  static parseStateToEvent(state){
    const event = {...state};
    const { allOffers, eventData, destinations, currentEventType, destinationNames } = event;

    //Удаление поля currentDestinationName, если оно не содержит корректного наименования
    if (!destinationNames.some((name) => name === event.currentDestinationName)) {
      delete event.currentDestinationName;
    }


    const getCurrentOffers = () => allOffers.find((currentData) => currentData.type === eventData.event.type).offers;
    const getCurrentDestinationData = () => destinations.find((destinationData) => destinationData.name === event.currentDestinationName);

    //Замена списка offers
    if (currentEventType && currentEventType !== eventData.event.type) {
      eventData.event.type = currentEventType;
      event.typeOffers = getCurrentOffers();

      //На данный момент лишь очищаю список выбранных офферов
      eventData.event.offers = [];
    }

    //Замена данных о пункте назначения
    //Меняем данные только если пункт назначения был изменен
    if (event.currentDestinationName && event.currentDestinationName !== eventData.destination.name) {
      eventData.destination = getCurrentDestinationData();
      eventData.event.destination = eventData.destination.id;
    }

    delete event.currentEventType;
    delete event.currentDestinationName;

    return event;
  }

  _restoreHandlers(){
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);

    this.element.querySelector('.event__type-group').addEventListener('click', this.#formChangeTypeHandler);
    this.element.querySelector('.event__input.event__input--destination').addEventListener('change', this.#formChangeDestinationHandler);
  }

  #formChangeTypeHandler = (evt) => {
    const targetInput = evt.target.closest('.event__type-input');
    if (targetInput) {
      this.element.querySelector('.event__type-toggle').value = targetInput.value;

      this.updateElement({currentEventType: targetInput.value});
    }
  };

  #formChangeDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({currentDestinationName: evt.target.value});
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditEventView.parseStateToEvent(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };
}
