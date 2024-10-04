import EventListView from '../view/events-list-view.js';
import BoardView from '../view/board-view.js';
import { remove, render } from '../framework/render.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import EventPresenter from './event-presenter.js';
import { SortType, UpdateType, UserAction } from '../utils/const.js';
import { sortEventsData } from '../utils/sort.js';
import SortPresenter from './sort-presenter.js';

export default class BoardPresenter {
  #boardComponent = new BoardView;
  #eventListComponent = new EventListView;
  #emptyEventsListComponent = new EmptyEventsListView;
  #boardContainer = null;

  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #handleCreateEventDestroy = null;

  #currentSortType = SortType.DAY;
  #eventPresenters = new Map();
  #sortPresenter = null;

  constructor({boardContainer, eventsModel, destinationsModel, offersModel, onCreateEventDestroy}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#handleCreateEventDestroy = onCreateEventDestroy;

    this.#eventsModel.addObserver(this.#handleModeEvent);
  }

  get events(){
    return sortEventsData(this.#eventsModel.events, this.#currentSortType);
  }

  init() {
    this.#renderBoard();
  }

  createEvent(){
    this.#currentSortType = SortType.DAY;
    //здесь надо добавить изменеие фильтра
  }

  #renderContainers(){
    render(this.#boardComponent, this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType){
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType,update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType,update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType,update);
        break;
    }
  };

  #handleModeEvent = (updateType, data) => {
    switch(updateType){
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.eventData.event.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };


  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #removeSort(){
    this.#sortPresenter.destroy();
    this.#sortPresenter = null;
  }

  #renderSort(){
    this.#sortPresenter = new SortPresenter({
      currentSortType: this.#currentSortType,
      sortContainer: this.#boardComponent.element,
      onSortTypeChange: this.#handleSortTypeChange
    });

    this.#sortPresenter.init();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderEmptyList(){
    render(this.#emptyEventsListComponent, this.#boardContainer);
  }

  #renderEvent(eventData, typeOffers, allTypes, destinations, destinationNames){
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init({eventData, typeOffers, allOffers: this.#offersModel.offers, allTypes, destinations, destinationNames});
    this.#eventPresenters.set(eventData.event.id, eventPresenter);
  }

  #renderEvents() {
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      const eventData = {
        event,
        offers: [...this.#offersModel.getOffersById(event.type, event.offers)],
        destination: this.#destinationsModel.getDestinationById(event.destination),
      };

      const typeOffers = this.#offersModel.getOffersByType(this.events[i].type).offers;
      const allTypes = this.#offersModel.allTypes;

      const destinations = this.#destinationsModel.destinations;
      const destinationNames = this.#destinationsModel.destinationNames;

      this.#renderEvent(eventData, typeOffers, allTypes, destinations, destinationNames);
    }
  }

  #clearBoard({resetSortType = false} = {}){
    this.#clearEventList();

    remove(this.#emptyEventsListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#removeSort();
    }
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderBoard(){
    this.#renderContainers();

    if (this.events.length === 0) {
      this.#renderEmptyList();
      return;
    }
    if(this.#sortPresenter === null) {
      this.#renderSort();
    }
    this.#renderEvents();
  }
}


