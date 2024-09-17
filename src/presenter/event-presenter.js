import { render, replace } from '../framework/render';
import EventItemView from '../view/event-item-view';
import FormEditEventView from '../view/form-edit-event-view';

export default class EventPresenter{
  #eventListContainer = null;

  #eventComponent = null;
  #eventEditComponent = null;


  #eventData = null;
  #typeOffers = null;
  #allTypes = null;

  constructor({eventListContainer}) {
    this.#eventListContainer = eventListContainer;
  }

  init({eventData, typeOffers, allTypes}){
    this.#eventData = eventData;
    this.#typeOffers = typeOffers;
    this.#allTypes = allTypes;

    this.#eventComponent = new EventItemView({
      eventData: this.#eventData,
      onEditClick: this.#handleEditClick,
    });

    this.#eventEditComponent = new FormEditEventView({
      eventData: this.#eventData,
      typeOffers: this.#typeOffers,
      allTypes: this.#allTypes,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
    });

    render(this.#eventComponent, this.#eventListContainer);
  }

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToEvent();
  };

  #handleFormClose = () => {
    this.#replaceFormToEvent();

  };

  #replaceEventToForm(){
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToEvent(){
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

}
