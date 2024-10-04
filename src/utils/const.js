
const FiltersEvent = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const TimeFormat = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  DATE_FULL: 'YYYY-MM-DD',
  DATETIME_FULL: 'YYYY-MM-DDTHH:mm',
  FORM_EDIT: 'DD/MM/YY HH:mm'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const emptyEventData = {
  destination: {
    description: '',
    id: '',
    name: ''
  },
  event: {
    basePrice: 0,
    dateFrom: '',
    dateTo: '',
    destination: '',
    id: '',
    isFavorite: false,
    offers: [],
    type: 'flight'
  },
  offers: []
};


export { SortType, TimeFormat, FiltersEvent, UserAction, UpdateType, emptyEventData};
