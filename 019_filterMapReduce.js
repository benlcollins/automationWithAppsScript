// FILTER
// Removes items that don't satisfy the criteria
// creates new array
function filterExample() {
  
  const numberArray = [1,39,10,7,2,22];
  console.log(numberArray);
  
  const filteredArray = numberArray.filter( number => number < 10 );
 
  console.log(filteredArray);
}


// MAP
// Executes a function on each element of an array
// creates a new array
function mapExample() {

  const numberArray = [1,39,10,7,2,22];
  console.log(numberArray);

  const mappedArray = numberArray.map(x => 2 * x);
  console.log(mappedArray);

}


// REDUCE
// reduces array to a single value
function reduceExample() {

  const numberArray = [1,39,10,7,2,22];
  console.log(numberArray);

  const reduceAnswer = numberArray.reduce((x,y) => x + y);
  console.log(reduceAnswer);

}
