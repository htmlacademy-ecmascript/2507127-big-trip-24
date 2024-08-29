import { createElement } from '../render.js';

const SORT_TYPE = ['day', 'event', 'time', 'price', 'offers'];

function createSortListItem(type) {
  return `<div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
              <label class="trip-sort__btn" for="sort-${type}">Day</label>
            </div>
            `;
}

function createSortList() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${SORT_TYPE.map((type) => createSortListItem(type).join())}
          </form>`;
}

export default class SortListView{
  getTemplate() {
    return createSortList();
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
