import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../utils/const.js';

function createSortItemTemplate(type) {
  return `<div data-sort-type="${type}" class="trip-sort__item trip-sort__item--${type}">
              <input
              id="sort-${type}"
              class="trip-sort__input
              visually-hidden"
              type="radio"
              name="trip-sort"
              ${type === 'day' ? 'checked' : ''}
              value="sort-${type}">
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>
            `;
}

function createSortTemplate() {
  const sortList = Object.values(SortType).map((type) => createSortItemTemplate(type)).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortList}
          </form>`;
}

export default class SortView extends AbstractView{
  get template() {
    return createSortTemplate();
  }
}
