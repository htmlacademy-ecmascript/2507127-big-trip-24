import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../utils/const.js';

function createFilterItemTemplate(type) {
  return `<div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
`;
}

const addFiltersList = () => FILTER_TYPES.map((type) => createFilterItemTemplate(type)).join('');

function createFiltersTemplate() {
  return `<form class="trip-filters" action="#" method="get">
  ${addFiltersList()}
  <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView{
  get template() {
    return createFiltersTemplate();
  }
}
