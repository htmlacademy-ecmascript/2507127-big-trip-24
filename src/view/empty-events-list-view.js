import AbstractView from '../framework/view/abstract-view.js';
import { emptyFilterMessage } from '../utils/const.js';

function createEmptyListMessageTemplate(currentFilterType) {
  return `
    <p class="trip-events__msg">${emptyFilterMessage[currentFilterType]}</p>
  `;
}

export default class EmptyEventsListView extends AbstractView {
  #currentFilterType;

  constructor({currentFilterType}){
    super();
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createEmptyListMessageTemplate(this.#currentFilterType);
  }
}
