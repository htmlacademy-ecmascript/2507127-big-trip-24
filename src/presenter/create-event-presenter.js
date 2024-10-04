import { nanoid } from 'nanoid';
import { remove, render, RenderPosition } from '../framework/render';
import { UpdateType, UserAction } from '../utils/const';
import FormEditEventView from '../view/form-edit-event-view';


export default class CreateEventPresenter{
  #eventsListContainer = null;
  #allOffers = [];
  #allDestinations = [];
  #formEditComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({eventsListContainer, allOffers, allDestinations, onDataChange, onDestroy}){
    this.#eventsListContainer = eventsListContainer;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(){
    if (this.#formEditComponent !== null) {
      return;
    }

    this.#formEditComponent = new FormEditEventView({
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      isCreateEvent: true,
      onFormSubmit: this.#handleFormSubmit,
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

  #handleFormSubmit = (event) =>{
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(),...event}
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
