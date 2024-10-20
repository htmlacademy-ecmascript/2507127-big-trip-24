import AbstractView from '../framework/view/abstract-view.js';
import { sortEventsData } from '../utils/sort.js';
import { SortType, TimeFormat } from '../utils/const.js';
import { humanizeDate } from '../utils/event.js';

const MAX_DESTINATION_COUNT = 3;

function createTripInfoTitlesTemplate(sortedEvents, destinations){
  const currentDestinationData = sortedEvents.map((event) => destinations.find((destination) => event.destination === destination.id));
  const currentDestinationNames = currentDestinationData.map((destination) => destination.name);

  const destinationsRoute = currentDestinationNames.length > MAX_DESTINATION_COUNT
    ? `${currentDestinationNames[0]} — ... — ${currentDestinationNames[currentDestinationNames.length - 1]}`
    : `${currentDestinationNames.join(' — ')}`;

  return `
    <h1 class="trip-info__title">${destinationsRoute}</h1>
  `;
}
function createTripInfoDatesTemplate(sortedEvents){
  const startTripDate = humanizeDate(sortedEvents[0]?.dateFrom, TimeFormat.INFO);
  const endTripDate = humanizeDate(sortedEvents[sortedEvents.length - 1]?.dateTo, TimeFormat.INFO);

  return `
    <p class="trip-info__dates">${startTripDate} — ${endTripDate}</p>
  `;
}

function createTripInfoMainTemplate(sortedEvents, destinations){
  return `
    <div class="trip-info__main">
      ${createTripInfoTitlesTemplate(sortedEvents, destinations)}
      ${createTripInfoDatesTemplate(sortedEvents)}
    </div>
  `;
}

function createTripInfoCostTemplate(sortedEvents, offers){
  //Сумма базовых цен
  const basePricesSum = sortedEvents.reduce((sum, event) => sum + event.basePrice, 0);

  //Сумма офферов
  const offersIds = sortedEvents.map((event) => event.offers).flat();
  const allOffers = offers.map((offer) => offer.offers).flat();
  const allOfferPrices = offersIds.map((ID) => allOffers.find((offer) => offer.id === ID).price);
  const offerPricesSum = allOfferPrices.reduce((sum, price) => sum + price, 0);

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePricesSum + offerPricesSum || 0}</span>
    </p>
  `;
}

function createTripInfoTemplate(sortedEvents, destinations, offers){
  return `
    <section class="trip-main__trip-info  trip-info">
      ${createTripInfoMainTemplate(sortedEvents, destinations)}
      ${createTripInfoCostTemplate(sortedEvents, offers)}
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #events = [];
  #offers = [];
  #destinations = [];

  #sortedEvents = [];

  constructor({events, offers, destinations}){
    super();

    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#sortedEvents = sortEventsData(this.#events, SortType.DAY);
  }

  get template() {
    return createTripInfoTemplate(this.#sortedEvents, this.#destinations, this.#offers);
  }
}
