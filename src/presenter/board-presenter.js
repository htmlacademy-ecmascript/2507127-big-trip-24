import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import FormAddEventView from '../view/form-add-event-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import BoardView from '../view/board-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView;
  eventListComponent = new EventListView;

  constructor({boardContainer, boardModel}) {
    this.boardContainer = boardContainer;
    this.boardModel = boardModel;
  }

  init() {
    this.boardEvents = [...this.boardModel.getEvents()];

    render(this.boardComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new SortView, this.boardComponent.getElement());
    render(new FormAddEventView, this.boardComponent.getElement());

    for (let i = 0; i < this.boardEvents.length; i++) {
      const eventData = this.boardEvents[i];
      const event = new EventItemView({
        event: eventData,
        offers: [...this.boardModel.getOffersById(eventData.type, eventData.offers)],
        destination: this.boardModel.getDestinationById(eventData.destination)
      });
      render(event, this.eventListComponent.getElement());
    }

    render(new FormEditEventView, this.boardContainer);
  }
}


