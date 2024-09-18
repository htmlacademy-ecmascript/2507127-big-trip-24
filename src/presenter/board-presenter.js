import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import BoardView from '../view/board-view.js';
import { render } from '../framework/render.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {
  #boardComponent = new BoardView;
  #eventListComponent = new EventListView;
  #boardContainer = null;
  #boardModel = null;
  #boardEvents = [];
  #eventPresenters = new Map();

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

  #handleEventChange = (updatedEvent) => {
    this.#boardEvents = updateItem(this.#boardEvents, updatedEvent.eventData.event);
    this.#eventPresenters.get(updatedEvent.eventData.event.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(new SortView, this.#boardComponent.element);
  }

  #renderEmptyList(){
    render(new EmptyEventsListView, this.#boardContainer);
  }

  #renderEvent(eventData, typeOffers, allTypes){
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init({eventData, typeOffers, allTypes});
    this.#eventPresenters.set(eventData.event.id, eventPresenter);
  }

  #renderEvents() {
    for (let i = 0; i < this.#boardEvents.length; i++) {
      const eventData = this.#boardModel.getEventData(this.#boardEvents[i]);
      const typeOffers = this.#boardModel.getOffersByType(this.#boardEvents[i].type).offers;
      const allTypes = this.#boardModel.allTypes;

      this.#renderEvent(eventData, typeOffers, allTypes);
    }
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
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


