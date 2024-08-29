import FilterList from './view/list-filter-view.js';
import SortList from './view/list-sort-view.js';
import ListItems from './view/list-items-view.js';
import { render } from './render.js';


const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
const siteTripEvents = document.querySelector('.trip-events');

render(new FilterList, siteTripControlsFilters);
render(new SortList, siteTripEvents);
render(new ListItems, siteTripEvents);

