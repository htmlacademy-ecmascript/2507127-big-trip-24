import { createElement } from '../render.js';
import { increaseNumber } from '../utils.js';
import { EVENT_OFFERS, PHOTOS_AMOUNT, EVENT_TYPE } from '../const.js';

//Замыкание для создания id с другим номером
const increment = increaseNumber();

function createEventTypeItemTemplate(type, num) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-${num}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${num}">${type}</label>
    </div>
  `;
}

const addEventTypeList = () => {
  const num = increment();
  return EVENT_TYPE.map((type) => createEventTypeItemTemplate(type, num)).join('');
};

function createFormHeaderTemplate() {
  const num = increment();
  return `
    <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${num}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${num}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${addEventTypeList()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${num}">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${num}" type="text" name="event-destination" value="Geneva" list="destination-list-1">
                    <datalist id="destination-list-${num}">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${num}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${num}" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${num}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${num}" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${num}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${num}" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
  `;
}

function createEventOfferTemplate(offer, num){

  return `
    <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-${num}" type="checkbox" name="event-offer-${offer.name}">
                        <label class="event__offer-label" for="event-offer-${offer.name}-${num}">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>
  `;
}

function createEventPhotoTemplate(number){
  return `<img class="event__photo" src="img/photos/${number}.jpg" alt="Event photo">`;
}

function addPhotoList(){
  let template = '';
  for (let i = 1; i <= PHOTOS_AMOUNT; i++) {
    template += createEventPhotoTemplate(i);
  }
  return template;
}

function createEventPhotoContainerTemplate(){
  return `
    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${addPhotoList()}
                      </div>
                    </div>
  `;
}

const addOfferList = () => {
  const num = increment();
  return EVENT_OFFERS.map((offer) => createEventOfferTemplate(offer, num)).join('');
};

function createEventDestinationTemplate(addPhoto = false) {
  return `
    <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

                    ${addPhoto ? createEventPhotoContainerTemplate() : ''}
                  </section>
  `;
}

function createEventDetailsTemplate(offer, destination) {
  return `
      <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offer}
                    </div>
                  </section>
                  ${destination}
                </section>
  `;
}

function createFormAddEventTemplate() {
  return `
    <form class="event event--edit" action="#" method="post">
      ${createFormHeaderTemplate()}
      ${createEventDetailsTemplate(addOfferList(), createEventDestinationTemplate(true))}
    </form>
  `;
}


export default class FormAddEventView{
  getTemplate() {
    return createFormAddEventTemplate();
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

export {addOfferList, createEventDetailsTemplate, createEventDestinationTemplate, addEventTypeList, increment };
