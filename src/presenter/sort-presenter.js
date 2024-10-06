import SortView from '../view/sort-view.js';
import { SortType } from '../utils/const';
import { remove, render, replace } from '../framework/render.js';

export default class SortPresenter{
  #sortComponent = null;
  #sortContainer = null;

  #currentSortType = SortType.DAY;

  #onSortTypeChange = null;

  constructor({currentSortType, sortContainer, onSortTypeChange}){
    this.#currentSortType = currentSortType;
    this.#sortContainer = sortContainer;
    this.#onSortTypeChange = onSortTypeChange;
  }

  init(){
    this.#renderSort();
  }

  #handleSortTypeChange = (sortType) =>{
    this.#currentSortType = sortType;
    this.#onSortTypeChange(sortType);
    this.#renderSort();
  };

  destroy(){
    remove(this.#sortComponent);
  }

  #renderSort(){
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#sortContainer);
      return;
    }

    replace(this.#sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }
}
