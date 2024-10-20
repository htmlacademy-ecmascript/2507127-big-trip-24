import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import { render } from './framework/render.js';
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import CreateEventButtonView from './view/create-event-button-view.js';
import FilterModel from './model/filter-model.js';
import EventsApiService from './events-api-service.js';

const AUTHORIZATION = 'Basic 0cqai2ez065nngc';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const headerContainer = document.querySelector('.trip-main');
const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
const bodyMainContainer = document.querySelector('main .page-body__container');

const createEventButtonViewComponent = new CreateEventButtonView({
  onClick: handleCreateEventButtonClick
});

const eventsApiService = new EventsApiService(END_POINT, AUTHORIZATION);
const filterModel = new FilterModel();
const offersModel = new OffersModel({eventsApiService});
const destinationsModel = new DestinationsModel({eventsApiService});
const eventsModel = new EventsModel({
  eventsApiService,
  offersModel,
  destinationsModel,
});

const tripInfoPresenter = new TripInfoPresenter({
  eventsModel,
  offersModel,
  destinationsModel,
  headerContainer
});

const boardPresenter = new BoardPresenter({
  boardContainer: bodyMainContainer,
  eventsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onCreateEventDestroy: handleCreateEventFormClose,
  createEventButton: createEventButtonViewComponent
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteTripControlsFilters,
  filterModel,
  eventsModel
});

function handleCreateEventButtonClick(){
  boardPresenter.createEvent();
  createEventButtonViewComponent.element.disabled = true;
}

function handleCreateEventFormClose(){
  createEventButtonViewComponent.element.disabled = false;
}
render(createEventButtonViewComponent, headerContainer);


filterPresenter.init();
eventsModel.init();
boardPresenter.init();
tripInfoPresenter.init();
