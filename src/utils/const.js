
const FiltersEvent = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SORT_TYPE = ['day', 'event', 'time', 'price', 'offers'];

const TimeFormat = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  DATE_FULL: 'YYYY-MM-DD',
  DATETIME_FULL: 'YYYY-MM-DDTHH:mm',
  FORM_EDIT: 'DD/MM/YY HH:mm'
};


export { SORT_TYPE, TimeFormat, FiltersEvent };
