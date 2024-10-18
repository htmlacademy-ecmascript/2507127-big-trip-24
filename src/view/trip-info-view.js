import AbstractView from '../framework/view/abstract-view.js';
import { sortEventsData } from '../utils/sort.js';
import { SortType, TimeFormat } from '../utils/const.js';
import { humanizeDate } from '../utils/event.js';

const MAX_DESTINATION_COUNT = 3;

function createTripInfoTitlesTemplate(events, destinations){
  const sortedEvents = sortEventsData(events, SortType.DAY);
  const currentDestinationData = sortedEvents.map((event) => destinations.find((destination) => event.destination === destination.id));
  const currentDestinationNames = currentDestinationData.map((destination) => destination.name);

  const destinationsRoute = currentDestinationNames.length > MAX_DESTINATION_COUNT
    ? `${currentDestinationNames[0]} — ... — ${currentDestinationNames[currentDestinationNames.length - 1]}`
    : `${currentDestinationNames.join(' — ')}`;

  return `
    <h1 class="trip-info__title">${destinationsRoute}</h1>
  `;
}
function createTripInfoDatesTemplate(events){
  const startTripDate = humanizeDate(events[0]?.dateFrom, TimeFormat.DATE);
  const endTripDate = humanizeDate(events[events.length - 1]?.dateTo, TimeFormat.DATE);

  return `
    <p class="trip-info__dates">${startTripDate} — ${endTripDate}</p>
  `;
}

function createTripInfoMainTemplate(events, destinations){
  return `
    <div class="trip-info__main">
      ${createTripInfoTitlesTemplate(events, destinations)}
      ${createTripInfoDatesTemplate(events)}
    </div>
  `;
}

function createTripInfoCostTemplate(events, offers){
  //Сумма базовых цен
  const basePricesSum = events.reduce((sum, event) => sum + event.basePrice, 0);

  //Сумма офферов
  const offersIds = events.map((event) => event.offers).flat();
  const allOffers = offers.map((offer) => offer.offers).flat();
  const allOfferPrices = offersIds.map((ID) => allOffers.find((offer) => offer.id === ID).price);
  const offerPricesSum = allOfferPrices.reduce((sum, price) => sum + price, 0);

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePricesSum + offerPricesSum || 0}</span>
    </p>
  `;
}

function createTripInfoTemplate(events, destinations, offers){
  return `
    <section class="trip-main__trip-info  trip-info">
      ${createTripInfoMainTemplate(events, destinations)}
      ${createTripInfoCostTemplate(events, offers)}
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #events = [];
  #offers = [];
  #destinations = [];

  constructor({events, offers, destinations}){
    super();

    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#destinations, this.#offers);
  }
}
