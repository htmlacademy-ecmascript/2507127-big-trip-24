import { remove, render, RenderPosition } from '../framework/render';
import { UpdateType, UserAction } from '../utils/const';
import FormEditEventView from '../view/form-edit-event-view';


export default class CreateEventPresenter{
  #eventsListContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #formEditComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({eventsListContainer, offersModel, destinationsModel, onDataChange, onDestroy}){
    this.#eventsListContainer = eventsListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(){
    if (this.#formEditComponent !== null) {
      return;
    }

    this.#formEditComponent = new FormEditEventView({
      allOffers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      allTypes: this.#offersModel.allTypes,
      destinationNames: this.#destinationsModel.destinationNames,
      isCreatingEvent: true,
      onFormCreate: this.#handleFormSubmit,
      onFormCancel: this.#handleFormCancel
    });

    render(this.#formEditComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy(){
    if (this.#formEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#formEditComponent);
    this.#formEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving(){
    this.#formEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting(){
    const resetFormState = () => {
      this.#formEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (data) =>{
    if (!data) {
      return;
    }
    const { eventData} = data;
    const { event } = eventData;

    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  #handleFormCancel = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) =>{
    if (evt.key === 'Escape'){
      evt.preventDefault();
      this.destroy();
    }
  };
}
