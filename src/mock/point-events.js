import { getRandomArrayElement } from '../utils';
import { destinations } from './destinations';
import { offers } from './offers';


const pointEvents = [
  {
    id: '1',
    basePrice: 700,
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: destinations[0],
    isFavorite: true,
    offers: offers[0].offers,
    type: offers[0].type,
  },
  {
    id: '2',
    basePrice: 700,
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: destinations[1],
    isFavorite: false,
    offers: offers[2].offers,
    type: offers[2].type,
  },
  {
    id: '3',
    basePrice: 700,
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: destinations[2],
    isFavorite: false,
    offers: offers[3].offers,
    type: offers[3].type,
  },
  {
    id: '4',
    basePrice: 700,
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: destinations[3],
    isFavorite: true,
    offers: offers[1].offers,
    type: offers[1].type,
  },
];

function getRandomPointEvent() {
  return getRandomArrayElement(pointEvents);
}

export { getRandomPointEvent };
