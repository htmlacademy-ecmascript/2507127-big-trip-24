import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPE } from '../const.js';

function createSortItemTemplate(type) {
  return `<div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>
            `;
}

const addSortList = () => SORT_TYPE.map((type) => createSortItemTemplate(type)).join('');

function createSortTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${addSortList()}
          </form>`;
}

export default class SortView extends AbstractView{
  get template() {
    return createSortTemplate();
  }
}
