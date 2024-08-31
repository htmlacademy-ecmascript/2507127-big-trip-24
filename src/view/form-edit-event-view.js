import { createElement } from '../render.js';
import {addOfferList, createEventDetailsTemplate, createEventDestinationTemplate, addEventTypeList, increment } from './form-add-event-view.js';

function createFormEditHeaderTemplate() {
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
                    <input class="event__input  event__input--destination" id="event-destination-${num}" type="text" name="event-destination" value="Chamonix" list="destination-list-${num}">
                    <datalist id="destination-list-${num}">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${num}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${num}" type="text" name="event-start-time" value="18/03/19 12:25">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${num}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${num}" type="text" name="event-end-time" value="18/03/19 13:35">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${num}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${num}" type="text" name="event-price" value="160">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
  `;
}

function createFormEditEventTemplate () {
  return `
  <form class="event event--edit" action="#" method="post">
    ${createFormEditHeaderTemplate()}
    ${createEventDetailsTemplate(addOfferList(), createEventDestinationTemplate())}
  </form>
  `;
}

export default class FormEditEventView{
  getTemplate() {
    return createFormEditEventTemplate();
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
