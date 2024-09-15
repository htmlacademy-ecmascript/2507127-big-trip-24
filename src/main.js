import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';
import BoardModel from './model/board-model.js';
import { generateFilter } from './mock/mock-filter.js';


const siteTripControlsFilters = document.querySelector('.trip-controls__filters');

const bodyMainContainer = document.querySelector('main .page-body__container');

const boardModel = new BoardModel();

const boardPresenter = new BoardPresenter({boardContainer: bodyMainContainer, boardModel});

const filters = generateFilter(boardModel.events);
render(new FiltersView({filters}), siteTripControlsFilters);

boardPresenter.init();
