import AbstractView from '../framework/view/abstract-view';

function createButtonTemplate(){
  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;
}

export default class CreateEventButtonView extends AbstractView{
  #handleFormOpen = null;

  constructor({ onClick }){
    super();

    this.#handleFormOpen = onClick;

    this.#setEventListeres();
  }

  get template(){
    return createButtonTemplate;
  }

  #setEventListeres(){
    this.element.addEventListener('click', this.#handleFormOpen);
  }
}
