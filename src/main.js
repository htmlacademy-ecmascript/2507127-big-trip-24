import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { render } from './framework/render.js';
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import CreateEventButtonView from './view/create-event-button-view.js';
import FilterModel from './model/filter-model.js';
import EventsApiService from './events-api-service.js';

const AUTHORIZATION = 'Basic 0cqai2ez065nngc';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const buttonContainer = document.querySelector('.trip-main');
const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
const bodyMainContainer = document.querySelector('main .page-body__container');

const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: bodyMainContainer,
  eventsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onCreateEventDestroy: handleCreateEventFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteTripControlsFilters,
  filterModel,
  eventsModel
});

const createEventButtonViewComponent = new CreateEventButtonView({
  onClick: handleCreateEventButtonClick
});

function handleCreateEventButtonClick(){
  boardPresenter.createEvent();
  createEventButtonViewComponent.element.disabled = true;
}

function handleCreateEventFormClose(){
  createEventButtonViewComponent.element.disabled = false;
}
render(createEventButtonViewComponent, buttonContainer);

filterPresenter.init();
boardPresenter.init();
eventsModel.init();
offersModel.init();
destinationsModel.init();
