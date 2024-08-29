import { createElement } from '../render.js';

const FILTER_TYPES = ['everything', 'future', 'present', 'past'];

function createFilterListItem(type) {
  return `<div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
`;
}

function createFilterListAcceptButton() {
  return '<button class="visually-hidden" type="submit">Accept filter</button>';
}

function createFilterList() {
  return `<form class="trip-filters" action="#" method="get">
  ${createFilterListAcceptButton()}
  ${FILTER_TYPES.map((type) => createFilterListItem(type)).join('')}
          </form>`;
}

export default class FilterListView{
  getTemplate() {
    return createFilterList();
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
