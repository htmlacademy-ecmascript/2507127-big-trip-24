
const EVENT_OFFERS = [
  {
    name: 'luggage',
    title: 'Add luggage',
    price: '30'
  },
  {
    name: 'comfort',
    title: 'Switch to comfort class',
    price: '100'
  },
  {
    name: 'meal',
    title: 'Add meal',
    price: '15'
  },
  {
    name: 'seats',
    title: 'Choose seats',
    price: '5'
  },
  {
    name: 'train',
    title: 'Travel by train',
    price: '40'
  },
];


const FILTER_TYPES = ['everything', 'future', 'present', 'past'];

const SORT_TYPE = ['day', 'event', 'time', 'price', 'offers'];

const EVENT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const TimeFormat = {
  DATE: 'MMM D',
  TIME: 'hh:mm',
  DATE_FULL: 'YYYY-MM-DD',
  DATETIME_FULL: 'YYYY-MM-DDTHH:MM'
};


export { EVENT_OFFERS, FILTER_TYPES, SORT_TYPE, EVENT_TYPE, TimeFormat };
