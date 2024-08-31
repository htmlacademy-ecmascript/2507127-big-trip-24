
//Использование замыканий для увеличения числа на единицу
const increaseNumber = () =>{
  let num = 1;
  return () => num++;
};

export { increaseNumber };
