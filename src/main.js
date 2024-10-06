import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { render } from './framework/render.js';
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import CreateEventButtonView from './view/create-event-button-view.js';
import FilterModel from './model/filter-model.js';

const buttonContainer = document.querySelector('.trip-main');
const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
const bodyMainContainer = document.querySelector('main .page-body__container');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const boardPresenter = new BoardPresenter({
  boardContainer: bodyMainContainer,
  eventsModel,
  destinationsModel,
  offersModel,
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
