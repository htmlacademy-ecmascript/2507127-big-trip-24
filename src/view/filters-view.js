import AbstractView from '../framework/view/abstract-view.js';
import { FiltersEvent } from '../utils/const.js';

function createFilterItemTemplate({type, count}) {
  return `<div class="trip-filters__filter">
                  <input
                  id="filter-${type}"
                  class="trip-filters__filter-input
                  visually-hidden" type="radio"
                  name="trip-filter"
                  value="${type}"
                  ${type === FiltersEvent.EVERYTHING ? 'checked' : ''}
                  ${count === 0 ? 'disabled' : ''}
                  >
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
`;
}


const addFiltersList = (filters) => filters.map((filter) => createFilterItemTemplate(filter)).join('');

function createFiltersTemplate(filters) {
  return `<form class="trip-filters" action="#" method="get">
  ${addFiltersList(filters)}
  <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView{
  #filters = null;
  constructor({filters}){
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
