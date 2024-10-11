import { remove, render, replace } from '../framework/render';
import { UpdateType, UserAction } from '../utils/const';
import EventItemView from '../view/event-item-view';
import FormEditEventView from '../view/form-edit-event-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class EventPresenter{
  #eventListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #eventData = null;
  #typeOffers = [];
  #allOffers = [];
  #allTypes = [];
  #destinations = [];
  #destinationNames = [];

  #mode = Mode.DEFAULT;

  constructor({eventListContainer, onDataChange, onModeChange}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({eventData, typeOffers, allOffers, allTypes, destinations, destinationNames}){
    this.#eventData = eventData;
    this.#typeOffers = typeOffers;
    this.#allOffers = allOffers;
    this.#allTypes = allTypes;
    this.#destinations = destinations;
    this.#destinationNames = destinationNames;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventItemView({
      eventData: this.#eventData,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new FormEditEventView({
      eventData: this.#eventData,
      typeOffers: this.#typeOffers,
      allTypes: this.#allTypes,
      allOffers: this.#allOffers,
      destinations: this.#destinations,
      destinationNames: this.#destinationNames,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      onFormDelete: this.#handleFormDelete,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      // replace(this.#eventEditComponent, prevEventEditComponent);
      replace(this.#eventComponent, prevEventEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy(){
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #resetEventEditComponentData(){
    this.#eventEditComponent.reset({
      eventData: this.#eventData,
      typeOffers: this.#typeOffers,
      allTypes: this.#allTypes,
      allOffers: this.#allOffers,
      destinations: this.#destinations,
      destinationNames: this.#destinationNames,
    });
  }

  resetView(){
    if (this.#mode !== 'DEFAULT') {
      this.#resetEventEditComponentData();
      this.#replaceFormToEvent();
    }
  }

  #handleFormDelete = () => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      {
        eventData: this.#eventData,
        typeOffers: this.#typeOffers,
        allTypes: this.#allTypes,
        allOffers: this.#allOffers,
        destinations: this.#destinations,
        destinationNames: this.#destinationNames,
      });
  };

  #handleFavoriteClick = () => {
    const event = {...this.#eventData.event, isFavorite: !this.#eventData.event.isFavorite};
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {
        eventData:{...this.#eventData, event},
        typeOffers: this.#typeOffers,
        allTypes: this.#allTypes,
        allOffers: this.#allOffers,
        destinations: this.#destinations,
        destinationNames: this.#destinationNames,
      });
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleFormSubmit = (event) => {
    //Выход из функции, если в форму редактирования не внесли изменения
    if (!event) {
      return;
    }

    this.#eventData = event.eventData;

    //Ре-рендер эвент-поинта с обновленными данными
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {
        eventData: this.#eventData,
        typeOffers: this.#typeOffers,
        allTypes: this.#allTypes,
        allOffers: this.#allOffers,
        destinations: this.#destinations,
        destinationNames: this.#destinationNames,
      });
  };

  #handleFormClose = () => {
    this.#resetEventEditComponentData();
    this.#replaceFormToEvent();
  };

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#resetEventEditComponentData();
      this.#replaceFormToEvent();
    }
  };

  setSaving(){
    if(this.#mode === Mode.EDITING){
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting(){
    if(this.#mode === Mode.EDITING){
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  #replaceEventToForm(){
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToEvent(){
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

}
