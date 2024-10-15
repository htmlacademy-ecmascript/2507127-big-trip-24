import EventListView from '../view/events-list-view.js';
import LoadingView from '../view/loading-view.js';
import BoardView from '../view/board-view.js';
import { remove, render } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import InitErrorView from '../view/init-error.js';
import EventPresenter from './event-presenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../utils/const.js';
import { sortEventsData } from '../utils/sort.js';
import SortPresenter from './sort-presenter.js';
import CreateEventPresenter from './create-event-presenter.js';
import { filter } from '../utils/filter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #boardComponent = new BoardView;
  #eventListComponent = new EventListView;
  #emptyEventsListComponent = null;
  #initErrorComponent = null;
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

  #createEventButtonComponent = null;
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({boardContainer, eventsModel, destinationsModel, offersModel, filterModel, onCreateEventDestroy, createEventButton}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#createEventButtonComponent = createEventButton;

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

  #handleViewAction = async (actionType, updateType, update) => {
    const {eventData} = update;

    this.#uiBlocker.block();

    switch(actionType){
      case UserAction.UPDATE_EVENT:
        this.#createEventButtonComponent.element.disabled = true;
        this.#eventPresenters.get(eventData.event.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType,update);
        } catch (error) {
          this.#eventPresenters.get(eventData.event.id).setAborting();
          this.#createEventButtonComponent.element.disabled = false;
        }
        break;
      case UserAction.ADD_EVENT:
        this.#createEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType,update);
        } catch (error) {
          this.#createEventPresenter.setAborting();
          this.#createEventButtonComponent.element.disabled = false;
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#createEventButtonComponent.element.disabled = true;
        this.#eventPresenters.get(eventData.event.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType,update);
        } catch (error) {
          this.#eventPresenters.get(eventData.event.id).setAborting();
          this.#createEventButtonComponent.element.disabled = false;
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType){
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.eventData.event.id).init(data);
        this.#createEventButtonComponent.element.disabled = false;
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
        this.#createEventButtonComponent.element.disabled = false;
        break;
      case UpdateType.ERROR:
        this.#clearBoard();
        this.#renderBoard({isError: true});
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

  #renderInitError(){
    this.#initErrorComponent = new InitErrorView();
    render(this.#initErrorComponent, this.#boardContainer);
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
    //Перенёс присваивание данных сюда, так как ранее данные с сервера отсутствовали в нужный момент
    this.#allTypes = this.#offersModel.allTypes;
    this.#destinationNames = this.#destinationsModel.destinationNames;

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
    this.#createEventButtonComponent.element.disabled = false;
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#removeSort();
    }
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderBoard({isError = false} = {}){
    this.#renderContainers();

    if (isError) {
      this.#renderInitError();
      this.#createEventButtonComponent.element.disabled = true;
      return;
    }

    if (this.#isLoading) {
      this.#createEventButtonComponent.element.disabled = true;
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

    //Уничтожаю форму создания после ре-рендера эвент-поинтов
    if (this.#createEventPresenter !== null) {
      this.#createEventPresenter.destroy();
      return;
    }
    this.#initCreatePresenter();
  }
}


