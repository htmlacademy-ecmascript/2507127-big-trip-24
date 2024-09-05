import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import FormAddEventView from '../view/form-add-event-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import BoardView from '../view/board-view.js';
import {EVENTS_AMOUNT} from '../const.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView;
  eventListComponent = new EventListView;

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new SortView, this.boardComponent.getElement());
    render(new FormAddEventView, this.boardComponent.getElement());

    for (let i = 0; i < EVENTS_AMOUNT; i++) {
      render(new EventItemView, this.eventListComponent.getElement());
    }

    render(new FormEditEventView, this.boardContainer);
  }
}


