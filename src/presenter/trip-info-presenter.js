import { remove, render, RenderPosition } from '../framework/render';
import TripInfoView from '../view/trip-info-view';


export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #headerContainer = null;

  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;


  constructor({eventsModel, offersModel, destinationsModel, headerContainer}) {
    this.#headerContainer = headerContainer;

    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init(){
    if (this.#tripInfoComponent !== null) {
      remove(this.#tripInfoComponent);
    }

    this.#tripInfoComponent = new TripInfoView({
      events: this.#eventsModel.events,
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
    });

    if (!this.#eventsModel.events.length) {
      remove(this.#tripInfoComponent);
      return;
    }

    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
