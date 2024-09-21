import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import BoardView from '../view/board-view.js';
import { remove, render } from '../framework/render.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../utils/const.js';
import { sortByDay, sortByEvent, sortByTime, sortByPrice, sortByOffers} from '../utils/event.js';

export default class BoardPresenter {
  #boardComponent = new BoardView;
  #eventListComponent = new EventListView;
  #sortComponent = null;
  #boardContainer = null;

  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;


  #boardEvents = [];
  #currentSortType = SortType.DAY;
  #eventPresenters = new Map();

  constructor({boardContainer, eventsModel, destinationsModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events];
    this.#sortEvents(this.#currentSortType);

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

  #sortEvents(sort){
    switch(sort){
      case SortType.DAY:
        this.#boardEvents.sort(sortByDay);
        break;
      case SortType.EVENT:
        this.#boardEvents.sort(sortByEvent);
        break;
      case SortType.TIME:
        this.#boardEvents.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#boardEvents.sort(sortByPrice);
        break;
      case SortType.OFFERS:
        this.#boardEvents.sort(sortByOffers);
        break;
    }

    this.#currentSortType = sort;

    this.#clearSort();
    if(this.#sortComponent !== null){
      this.#renderSort();
    }
  }

  #clearSort(){
    remove(this.#sortComponent);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEvents();
  };

  #renderSort() {
    this.#sortComponent = new SortView({currentSortType: this.#currentSortType, onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#boardComponent.element);
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

  #getDesination(event){
    return this.#destinationsModel.getDestinationById(event.destination);
  }

  #renderEvents() {
    for (let i = 0; i < this.#boardEvents.length; i++) {
      const event = this.#boardEvents[i];
      const eventData = {
        event,
        offers: [...this.#offersModel.getOffersById(event.type, event.offers)],
        destination: this.#getDesination(event),
      };

      const typeOffers = this.#offersModel.getOffersByType(this.#boardEvents[i].type).offers;
      const allTypes = this.#offersModel.allTypes;

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


