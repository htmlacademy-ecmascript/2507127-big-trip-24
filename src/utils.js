import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';

//Использование замыканий для увеличения числа на единицу
const increaseNumber = () => {
  let num = 1;
  return () => num++;
};

function getRandomArrayElement(items){
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(date){
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeDateTime(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function isEventExpired(dueDate){
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isEventRepeating(repeating) {
  return Object.values(repeating).some(Boolean);
}

export { increaseNumber, getRandomArrayElement, humanizeDate, humanizeDateTime, isEventExpired, isEventRepeating };
