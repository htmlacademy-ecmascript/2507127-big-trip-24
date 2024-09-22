import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import { generateFilter } from './mock/mock-filter.js';


const siteTripControlsFilters = document.querySelector('.trip-controls__filters');

const bodyMainContainer = document.querySelector('main .page-body__container');

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const boardPresenter = new BoardPresenter({boardContainer: bodyMainContainer, eventsModel, destinationsModel, offersModel});

const filters = generateFilter(eventsModel.events);
render(new FiltersView({filters}), siteTripControlsFilters);

boardPresenter.init();
