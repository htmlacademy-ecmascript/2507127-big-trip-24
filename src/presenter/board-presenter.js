import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import FormEditEventView from '../view/form-edit-event-view.js';
import BoardView from '../view/board-view.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {
  #boardComponent = new BoardView;
  #eventListComponent = new EventListView;
  #boardContainer = null;
  #boardModel = null;

  constructor({boardContainer, boardModel}) {
    this.#boardContainer = boardContainer;
    this.#boardModel = boardModel;
  }

  init() {
    this.boardEvents = [...this.#boardModel.events];

    this.#renderBoard();
  }

  #renderEvent(eventData, typeOffers, allTypes){
    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const onEditClick = () => {
      replaceEventToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const eventComponent = new EventItemView({
      eventData,
      onEditClick,
    });

    const onFormSubmit = () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const onFormClose = () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const eventEditComponent = new FormEditEventView({
      eventData,
      typeOffers,
      allTypes,
      onFormSubmit,
      onFormClose,
    });

    function replaceEventToForm(){
      replace(eventEditComponent, eventComponent);
    }
    function replaceFormToEvent(){
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#eventListComponent.element);
  }

  #renderBoard(){
    render(this.#boardComponent, this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);
    render(new SortView, this.#boardComponent.element);

    for (let i = 0; i < this.boardEvents.length; i++) {
      const eventData = this.#boardModel.getEventData(this.boardEvents[i], this.#boardModel);
      const typeOffers = this.#boardModel.getOffersByType(this.boardEvents[i].type).offers;
      const allTypes = this.#boardModel.allTypes;

      this.#renderEvent(eventData, typeOffers, allTypes);
    }
  }
}


