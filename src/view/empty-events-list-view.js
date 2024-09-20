import AbstractView from '../framework/view/abstract-view.js';


function createEmptyListMessageTemplate() {
  return `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
}

export default class EmptyEventsListView extends AbstractView {
  get template() {
    return createEmptyListMessageTemplate();
  }
}
