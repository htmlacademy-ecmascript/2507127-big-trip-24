
//Использование замыканий для увеличения числа на единицу
const increaseNumber = () => {
  let num = 1;
  return () => num++;
};


function addDaysToCurrentDate(days){
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + days);
  return newDate;

}

export { increaseNumber, addDaysToCurrentDate};
