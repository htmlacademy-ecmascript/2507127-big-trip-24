import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../utils/const.js';

function createSortItemTemplate(currentSortType, type) {
  return `<div class="trip-sort__item trip-sort__item--${type}">
              <input
              data-sort-type="${type}"
              id="sort-${type}"
              class="trip-sort__input
              visually-hidden"
              type="radio"
              name="trip-sort"
              ${currentSortType === type ? 'checked' : ''}
              value="sort-${type}">
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>
            `;
}

function createSortTemplate(currentSortType) {
  const sortList = Object.values(SortType).map((type) => createSortItemTemplate(currentSortType, type)).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortList}
          </form>`;
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}){
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.#setEventListener();
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #setEventListener(){
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    const targetElement = evt.target.closest('.trip-sort__input');
    if (!targetElement){
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(targetElement.dataset.sortType);
  };
}
