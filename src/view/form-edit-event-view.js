import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {emptyEventData, TimeFormat } from '../utils/const.js';
import { getCheckedOfferTitles, humanizeDate } from '../utils/event.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createEventTypeItemTemplate(type, checkedType) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === checkedType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>
  `;
}

function createFormHeaderTypeTemplate(event, allTypes, currentEventType, isDisabled){
  const checkedType = currentEventType || event.type;
  const eventTypeList = allTypes.map((type) => createEventTypeItemTemplate(type, checkedType)).join('');

  return `
    <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${currentEventType || event.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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

function createFormHeaderEventNameTemplate({event, destination, destinationNames, currentEventType, currentDestinationName, isDisabled}){
  const destinationOptions = destinationNames.map((destinationName) => createDestinationOptionTemplate(destinationName)).join('');

  // На случай, если пользователь введет название пункта назначения отсутствующего в списке
  let destinationValue;
  if (currentDestinationName) {
    destinationValue = destinationNames.some((name) => name === currentDestinationName) ? currentDestinationName : null;
  }

  return `
    <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${currentEventType || event.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationValue || destination.name}" list="destination-list-1" ${isDisabled ? 'disabled' : ''} required>
                    <datalist id="destination-list-1">
                      ${destinationOptions}
                    </datalist>
                  </div>
  `;
}

function createFormHeaderTimeTemplate(event, isDisabled){
  const startTime = humanizeDate(event.dateFrom, TimeFormat.FORM_EDIT);
  const endTime = humanizeDate(event.dateTo, TimeFormat.FORM_EDIT);

  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}" ${isDisabled ? 'disabled' : ''} required>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}" ${isDisabled ? 'disabled' : ''} required>
    </div>
  `;
}

function createFormHeaderPriceTemplate(event, isDisabled){
  const {basePrice} = event;

  return `
    <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''} min="1" required>
                  </div>
  `;
}

function createRollUpButtonTemplate(isDisabled){
  return `
    <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
      <span class="visually-hidden">Open event</span>
    </button>
  `;
}

function createFormHeaderButtonsTemplate(isCreatingEvent, isDisabled, isSaving, isDeleting){
  const deleteButton = isDeleting ? 'Deleting...' : 'Delete';
  const cancelButton = 'Cancel';

  return `
    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${ !isCreatingEvent ? deleteButton : cancelButton}</button>
    ${!isCreatingEvent ? createRollUpButtonTemplate(isDisabled) : ''}
  `;
}

function createFormHeaderTemplate({event, destination, allTypes, destinationNames, currentEventType, currentDestinationName, isCreatingEvent, isDisabled, isSaving, isDeleting}) {

  return `
    <header class="event__header">
                  ${createFormHeaderTypeTemplate(event, allTypes, currentEventType, isDisabled)}
                  ${createFormHeaderEventNameTemplate({event, destination, destinationNames, currentEventType, currentDestinationName, isDisabled})}
                  ${createFormHeaderTimeTemplate(event, isDisabled)}
                  ${createFormHeaderPriceTemplate(event, isDisabled)}
                  ${createFormHeaderButtonsTemplate(isCreatingEvent, isDisabled, isSaving, isDeleting)}
                </header>
  `;
}

function createEventOfferTemplate(offer, choosedOffers, isDisabled){
  const isChoosedOffer = choosedOffers.includes(offer.id);
  return `
    <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${isChoosedOffer ? 'checked' : ''} data-offer="${offer.title}" ${isDisabled ? 'disabled' : ''}>
                        <label class="event__offer-label" for="event-offer-${offer.title}-1">
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

function createEventDescriptionTemplate(description){
  return `
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
  `;
}

function createEventDestinationTemplate({description, pictures}) {
  const isDataEmpty = !description || description.length === 0 && pictures.length === 0;
  if (isDataEmpty) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      ${createEventDescriptionTemplate(description)}
      ${pictures.length > 0 ? createEventPhotoContainerTemplate(pictures) : ''}
    </section>
  `;
}

function createOfferListTemplate(offerList) {
  return `
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offerList}
    </div>
  </section>
  `;
}

function createEventDetailsTemplate(offerList, destination) {
  return `
      <section class="event__details">

                    ${offerList?.length ? createOfferListTemplate(offerList) : '' }

                  ${destination}
                </section>
  `;
}

function createFormAddEventTemplate({
  eventData,
  typeOffers,
  allOffers,
  allTypes,
  destinationNames,
  currentDestinationName,
  destinations,
  currentEventType,
  isCreatingEvent,
  isDisabled,
  isSaving,
  isDeleting
}) {
  const {event, destination} = eventData;
  const choosedOffers = event.offers;

  let updatedOffers, initialOffers;

  const getCurrentOffers = (offers) => offers?.map((offer) => createEventOfferTemplate(offer, choosedOffers, isDisabled)).join('');

  if (currentEventType) {
    const actualOffers = allOffers.find((offers) => offers.type === currentEventType).offers;
    updatedOffers = getCurrentOffers(actualOffers) || [];
  } else {
    const defaultOffers = allOffers.find((offers) => offers.type === 'flight').offers;
    initialOffers = getCurrentOffers(typeOffers) === undefined ? getCurrentOffers(defaultOffers) : getCurrentOffers(typeOffers);
  }

  const offersList = updatedOffers || initialOffers;

  let updatedDestination;
  if (currentDestinationName) {
    updatedDestination = destinations.find((currentData) => currentData.name === currentDestinationName);
  }

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createFormHeaderTemplate({event, destination, allTypes, destinationNames, currentEventType, currentDestinationName, isCreatingEvent, isDisabled, isSaving, isDeleting})}
      ${createEventDetailsTemplate(offersList, createEventDestinationTemplate(updatedDestination || destination))}
    </form>
  </li>
  `;
}


export default class FormEditEventView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #handleFormCreate = null;
  #handleFormClose = null;
  #handleFormDelete = null;
  #handleFormCancel = null;

  #datepickerStart = null;
  #datepickerEnd = null;

  #isCreatingEvent = null;

  constructor({
    eventData = emptyEventData,
    isCreatingEvent = false,
    allOffers,
    typeOffers,
    allTypes,
    destinations,
    destinationNames,
    onFormSubmit,
    onFormCreate,
    onFormClose,
    onFormDelete,
    onFormCancel
  }) {
    super();
    this.#isCreatingEvent = isCreatingEvent;

    this._setState(FormEditEventView.parseEventToState({
      eventData,
      allTypes,
      destinations,
      destinationNames,
      typeOffers,
      allOffers,
      initialOffers: eventData.offers,
      isCreatingEvent: this.#isCreatingEvent
    }));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormCreate = onFormCreate;
    this.#handleFormClose = onFormClose;
    this.#handleFormDelete = onFormDelete;

    this.#handleFormCancel = onFormCancel;

    this._restoreHandlers();
  }

  get template() {
    return createFormAddEventTemplate(this._state);
  }

  removeElement(){
    super.removeElement();

    if (this.#datepickerStart || this.#datepickerEnd) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;

      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset(event){
    delete this._state.currentEventType;
    delete this._state.currentDestinationName;
    delete this._state.userDateFrom;
    delete this._state.userDateTo;
    delete this._state.isDisabled;
    delete this._state.isSaving;
    delete this._state.isDeleting;

    this.updateElement(FormEditEventView.parseEventToState(event));
  }

  _restoreHandlers(){
    this.element.querySelector('.event__type-group').addEventListener('click', this.#formChangeTypeHandler);
    this.element.querySelector('.event__input.event__input--destination').addEventListener('change', this.#formChangeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('keydown', this.#inputPriceHandler);

    this.#setDatepickers();

    this._setOptionalHandlers();
  }

  _setOptionalHandlers(){
    if (!this.#isCreatingEvent) {
      this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    } else {
      this.element.querySelector('.event--edit').addEventListener('submit', this.#formCreateHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formCancelHandler);
    }
  }

  #changeEventData(state, closeForm){
    const event = {...state};

    //Получение и сравнение начальных/текущих выбранных офферов
    const initialCheckedOffers = [...event.initialOffers.map((offer) => offer.title)];
    const currentCheckedOffers = getCheckedOfferTitles();
    const isOffersEqual = currentCheckedOffers.every((offer) => initialCheckedOffers.includes(offer)) && initialCheckedOffers.every((offer) => currentCheckedOffers.includes(offer));

    //Получение и сравнение начальной/текущей цен
    const initialPrice = event.eventData.event.basePrice;
    const currentPrice = Number(document.querySelector('.event__input--price').value) || 0;
    const isPircesEqual = initialPrice === currentPrice;

    //Выход из функции при отсутствии изменений
    const allNewProperties = [
      event.currentEventType,
      event.currentDestinationName,
      event.userDateFrom,
      event.userDateTo,
    ];
    const isNoChanges = allNewProperties.every((property) => property === undefined) && isOffersEqual && isPircesEqual;
    if (isNoChanges) {
      closeForm();
      return;
    }

    const { allOffers, eventData, destinations, currentEventType, destinationNames } = event;

    //Удаление поля currentDestinationName, если оно не содержит корректного наименования
    if (!destinationNames.some((name) => name === event.currentDestinationName)) {
      delete event.currentDestinationName;
    }

    const getCurrentOffers = () => allOffers.find((currentData) => currentData.type === eventData.event.type).offers;
    const getCurrentDestinationData = () => destinations.find((destinationData) => destinationData.name === event.currentDestinationName);

    //Замена списка офферов и типа события
    if (currentEventType && currentEventType !== eventData.event.type) {
      eventData.event.type = currentEventType;
      event.typeOffers = getCurrentOffers();
    }
    //Замена выбранных пользователем офферов
    if (!isOffersEqual) {
      if (event.typeOffers === undefined) {
        event.typeOffers = [...event.allOffers].filter((offer) => offer.type === event.eventData.event.type)[0].offers || [];
      }

      const currentFullCheckedOffers = [...event.typeOffers.filter((offer) => currentCheckedOffers.includes(offer.title))];

      eventData.offers = currentFullCheckedOffers;
      eventData.event.offers = [...currentFullCheckedOffers.map((offer) => offer.id)];

    }

    //Замена данных о пункте назначения
    //Меняем данные только если пункт назначения был изменен
    if (event.currentDestinationName && event.currentDestinationName !== eventData.destination.name) {
      eventData.destination = getCurrentDestinationData();
      eventData.event.destination = eventData.destination.id;
    }

    //Замена дат
    if (event.userDateFrom) {
      eventData.event.dateFrom = event.userDateFrom;
    }
    if (event.userDateTo) {
      eventData.event.dateTo = event.userDateTo;
    }

    //Замена цены
    event.eventData.event.basePrice = currentPrice;

    delete event.currentEventType;
    delete event.currentDestinationName;
    delete event.userDateFrom;
    delete event.userDateTo;
    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }

  #setDatepickers(){
    this.#datepickerStart = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'), {
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: this._state.userDateFrom || this._state.eventData.event.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
      });

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'), {
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: this._state.userDateTo || this._state.eventData.event.dateTo,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._state.userDateFrom || this._state.eventData.event.dateFrom
      });
  }

  #dateFromChangeHandler = ([userDateFrom]) => {
    this._setState({userDateFrom});
    this.#datepickerEnd.set('minDate', this._state.userDateFrom);
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this._setState({userDateTo});
    this.#datepickerStart.set('maxDate', this._state.userDateTo);
  };

  #formChangeTypeHandler = (evt) => {
    const targetInput = evt.target.closest('.event__type-input');
    if (targetInput) {
      this.element.querySelector('.event__type-toggle').value = targetInput.value;

      this._state.eventData.event.basePrice = this.element.querySelector('.event__input--price').value;
      this.updateElement({currentEventType: targetInput.value});
    }
  };

  #formChangeDestinationHandler = (evt) => {
    evt.preventDefault();
    this._state.eventData.event.basePrice = this.element.querySelector('.event__input--price').value;
    this.updateElement({currentDestinationName: evt.target.value});
  };

  #formCreateHandler = (evt) => {
    evt.preventDefault();

    //Выход из функции при отсутсвии введённых данных
    const inputValues = [
      document.querySelector('input[name="event-destination"]').value,
      document.querySelector('input[name="event-start-time"]').value,
      document.querySelector('input[name="event-end-time"]').value,
    ];
    if (inputValues.some((value) => value === '')) {
      return;
    }

    this.#handleFormCreate(FormEditEventView.parseStateToEvent(this._state, this.#changeEventData, this.#handleFormClose));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditEventView.parseStateToEvent(this._state, this.#changeEventData, this.#handleFormClose));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete();
  };

  #formCancelHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormCancel();
  };

  #inputPriceHandler = (evt) => {
    if(isNaN(evt.key)) {
      evt.preventDefault();
    }
  };

  static parseEventToState(event){
    return {...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state, changeData, closeForm){
    return changeData(state, closeForm);
  }
}
