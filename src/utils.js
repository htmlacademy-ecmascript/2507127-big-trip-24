import dayjs from 'dayjs';


function humanizeDate(date, format){
  return date ? dayjs(date).format(format) : '';
}

function isEventExpired(dueDate){
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

//Использование замыканий для увеличения числа на единицу
const increaseNumber = () => {
  let num = 1;
  return () => num++;
};

function getRandomArrayElement(items){
  return items[Math.floor(Math.random() * items.length)];
}

function isEventRepeating(repeating) {
  return Object.values(repeating).some(Boolean);
}

export { increaseNumber, getRandomArrayElement, humanizeDate, isEventExpired, isEventRepeating };
