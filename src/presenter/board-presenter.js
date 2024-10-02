import EventListView from '../view/events-list-view.js';
import BoardView from '../view/board-view.js';
import { remove, render } from '../framework/render.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../utils/const.js';
import { sortEventsData } from '../utils/sort.js';
import SortPresenter from './sort-presenter.js';

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
  #sortPresenter = null;

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

  #sortEvents(sortType){
    sortEventsData(this.#boardEvents, sortType);

    this.#currentSortType = sortType;

    this.#clearSort();
    if(this.#sortComponent !== null){
      this.#renderSort();
    }
  }

  #renderSort(){
    this.#sortPresenter = new SortPresenter({
      sortContainer: this.#boardComponent.element,
      onSortTypeChange: this.#handleSortTypeChange
    });

    this.#sortPresenter.init();
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


  #renderEmptyList(){
    render(new EmptyEventsListView, this.#boardContainer);
  }

  #renderEvent(eventData, typeOffers, allTypes, destinations, destinationNames){
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init({eventData, typeOffers, allOffers: this.#offersModel.offers, allTypes, destinations, destinationNames});
    this.#eventPresenters.set(eventData.event.id, eventPresenter);
  }

  #renderEvents() {
    for (let i = 0; i < this.#boardEvents.length; i++) {
      const event = this.#boardEvents[i];
      const eventData = {
        event,
        offers: [...this.#offersModel.getOffersById(event.type, event.offers)],
        destination: this.#destinationsModel.getDestinationById(event.destination),
      };

      const typeOffers = this.#offersModel.getOffersByType(this.#boardEvents[i].type).offers;
      const allTypes = this.#offersModel.allTypes;

      const destinations = this.#destinationsModel.destinations;
      const destinationNames = this.#destinationsModel.destinationNames;

      this.#renderEvent(eventData, typeOffers, allTypes, destinations, destinationNames);
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


