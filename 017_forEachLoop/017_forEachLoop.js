// forEach loop
function forEachLoop() {
  
  const numberArray = ['one', 'two', 'three', 'four'];
  
  numberArray.forEach((item,i) => {
    
    console.log(item);
    console.log(i);
    
  });

}


// second forEach loop example
// call a function inside loop
function forEachLoopTemp() {
  
  const celciusArray = [0,13,19,11,24,29,34,17,4];
  
  const farenheitArray = [];
  
  celciusArray.forEach((celciusTemp) => {
    
    // call function here
    const farenheitTemp = convertCtoF(celciusTemp);
    //console.log(farenheitTemp);
    
    farenheitArray.push(farenheitTemp);
    
  });
  console.log('Celcius Array:');
  console.log(celciusArray);
  
  console.log('Farenheit Array');
  console.log(farenheitArray);
  
  
}


// function to convert celcius to farenheit
const convertCtoF = t => ( (t * 9/5) + 32 );
