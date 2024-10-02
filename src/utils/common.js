
//Использование замыканий для увеличения числа на единицу
const increaseNumber = () => {
  let num = 1;
  return () => num++;
};

function getRandomArrayElement(items){
  return items[Math.floor(Math.random() * items.length)];
}

function getUniqueElements(amount, getElement){
  const elements = [];
  let element;
  for(let i = 1; i <= amount; i++) {
    do{
      element = getElement();
    }while(elements.includes(element));
    elements.push(element);
  }
  return elements;
}

export { increaseNumber, getRandomArrayElement, getUniqueElements};
