import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const {type, count} = filter;
  return `<div class="trip-filters__filter">
                  <input
                  id="filter-${type}"
                  class="trip-filters__filter-input
                  visually-hidden" type="radio"
                  name="trip-filter"
                  value="${type}"
                  ${type === currentFilterType ? 'checked' : ''}
                  ${count === 0 ? 'disabled' : ''}
                  >
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
`;
}

function createFiltersTemplate(filters, currentFilterType) {
  const filtersList = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return `<form class="trip-filters" action="#" method="get">
  ${filtersList}
  <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView{
  #filters = null;
  #currentFilterType = null;

  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}){
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.#setEventListeners();
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  #setEventListeners(){
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const targetElement = evt.target.closest('input.trip-filters__filter-input');
    if (targetElement){
      this.#handleFilterTypeChange(targetElement.value);
    }
  };
}
