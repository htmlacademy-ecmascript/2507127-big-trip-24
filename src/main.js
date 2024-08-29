import FilterListView from './view/list-filter-view.js';
import SortListView from './view/list-sort-view.js';
import ListItemsView from './view/list-items-view.js';
import { render } from './render.js';


const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
const siteTripEvents = document.querySelector('.trip-events');

render(new FilterListView, siteTripControlsFilters);
render(new SortListView, siteTripEvents);
render(new ListItemsView, siteTripEvents);

