import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import BoardView from '../view/board-view.js';
import { render } from '../framework/render.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import EventPresenter from './event-presenter.js';

export default class BoardPresenter {
  #boardComponent = new BoardView;
  #eventListComponent = new EventListView;
  #boardContainer = null;
  #boardModel = null;
  #boardEvents = null;

  constructor({boardContainer, boardModel}) {
    this.#boardContainer = boardContainer;
    this.#boardModel = boardModel;
  }

  init() {
    this.#boardEvents = [...this.#boardModel.events];

    this.#renderBoard();
  }

  #renderContainers(){
    render(this.#boardComponent, this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);
  }

  #renderSort() {
    render(new SortView, this.#boardComponent.element);
  }

  #renderEmptyList(){
    render(new EmptyEventsListView, this.#boardContainer);
  }

  #renderEvent(eventData, typeOffers, allTypes){

    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element
    });

    eventPresenter.init({eventData, typeOffers, allTypes});
  }

  #renderEvents() {
    for (let i = 0; i < this.#boardEvents.length; i++) {
      const eventData = this.#boardModel.getEventData(this.#boardEvents[i]);
      const typeOffers = this.#boardModel.getOffersByType(this.#boardEvents[i].type).offers;
      const allTypes = this.#boardModel.allTypes;

      this.#renderEvent(eventData, typeOffers, allTypes);
    }
  }

  #renderBoard(){
    this.#renderContainers();
    this.#renderSort();

    if (this.#boardEvents.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderEvents();
  }
}


