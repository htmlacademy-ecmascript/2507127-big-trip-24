import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';

const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
render(new FiltersView, siteTripControlsFilters);

const bodyMainContainer = document.querySelector('main .page-body__container');
const boardPresenter = new BoardPresenter({boardContainer: bodyMainContainer});

boardPresenter.init();
