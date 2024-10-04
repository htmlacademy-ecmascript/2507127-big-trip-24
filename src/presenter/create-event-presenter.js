import { nanoid } from 'nanoid';
import { remove, render, RenderPosition } from '../framework/render';
import { UpdateType, UserAction } from '../utils/const';
import FormEditEventView from '../view/form-edit-event-view';


export default class CreateEventPresenter{
  #eventsListContainer = null;
  #allOffers = [];
  #allDestinations = [];
  #allTypes = [];
  #destinationNames = [];
  #formEditComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({eventsListContainer, allOffers, allDestinations, allTypes, destinationNames, onDataChange, onDestroy}){
    this.#eventsListContainer = eventsListContainer;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#destinationNames = destinationNames;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#allTypes = allTypes;
  }

  init(){
    if (this.#formEditComponent !== null) {
      return;
    }

    this.#formEditComponent = new FormEditEventView({
      allOffers: this.#allOffers,
      destinations: this.#allDestinations,
      allTypes: this.#allTypes,
      destinationNames: this.#destinationNames,
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

  #handleFormSubmit = (data) =>{
    const { eventData} = data;
    const { event } = eventData;
    event.id = nanoid();

    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event
    );
    this.destroy();
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
