import EventListView from '../view/events-list-view.js';
import LoadingView from '../view/loading-view.js';
import BoardView from '../view/board-view.js';
import { remove, render } from '../framework/render.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import EventPresenter from './event-presenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../utils/const.js';
import { sortEventsData } from '../utils/sort.js';
import SortPresenter from './sort-presenter.js';
import CreateEventPresenter from './create-event-presenter.js';
import { filter } from '../utils/filter.js';

export default class BoardPresenter {
  #boardComponent = new BoardView;
  #eventListComponent = new EventListView;
  #emptyEventsListComponent = null;
  #loadingComponent = new LoadingView;
  #boardContainer = null;

  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #allTypes = [];
  #destinationNames = [];

  #handleCreateEventDestroy = null;

  #eventPresenters = new Map();
  #sortPresenter = null;
  #createEventPresenter = null;

  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor({boardContainer, eventsModel, destinationsModel, offersModel, filterModel, onCreateEventDestroy}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#allTypes = this.#offersModel.allTypes;
    this.#destinationNames = this.#destinationsModel.destinationNames;

    this.#handleCreateEventDestroy = onCreateEventDestroy;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events(){
    this.#currentFilterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#currentFilterType](events);
    return sortEventsData(filteredEvents, this.#currentSortType);
  }

  init() {
    this.#renderBoard();
    this.#initCreatePresenter();
  }

  #initCreatePresenter(){
    this.#createEventPresenter = new CreateEventPresenter({
      eventsListContainer: this.#eventListComponent.element,
      allOffers: this.#offersModel.offers,
      allTypes: this.#allTypes,
      destinationNames: this.#destinationNames,
      allDestinations: this.#destinationsModel.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#createEventDestroyHandler
    });

  }

  #createEventDestroyHandler = () => {
    this.#handleCreateEventDestroy();
    if (!this.events.length) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  createEvent(){
    this.#handleModelEvent(UpdateType.MAJOR);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#createEventPresenter.init();
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

  #handleModelEvent = (updateType, data) => {
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };


  #handleModeChange = () => {
    if (this.#createEventPresenter !== null){
      this.#createEventPresenter.destroy();
    }
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #removeSort(){
    if (this.#sortPresenter !== null){
      this.#sortPresenter.destroy();
      this.#sortPresenter = null;
    }
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

  #renderLoading() {
    render(this.#loadingComponent, this.#boardComponent.element);
  }

  #renderEmptyList(){
    this.#emptyEventsListComponent = new EmptyEventsListView({currentFilterType: this.#currentFilterType});
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

      const destinations = this.#destinationsModel.destinations;

      this.#renderEvent(eventData, typeOffers, this.#allTypes, destinations, this.#destinationNames);
    }
  }

  #clearBoard({resetSortType = false} = {}){
    this.#clearEventList();

    remove(this.#emptyEventsListComponent);
    remove(this.#loadingComponent);
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

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

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


