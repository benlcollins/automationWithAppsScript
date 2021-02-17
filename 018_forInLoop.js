// forEach does not work for objects
// gives error
function forEachObjectTest() {
  
  const employee = {
    name: "Joe Bloggs",
    age: 25,
    title: "Data Analyst"
  }
  
  employee.forEach(item => console.log(item) );

}


// instead, use a for...in loop with objects
function forInObjectLoop() {
  
  const employee = {
    name: "Joe Bloggs",
    age: 25,
    title: "Data Analyst"
  }
  
  for (const property in employee) {
    
    // log the key
    console.log(property); // e.g. name
    
    // log the corresponding value
    console.log(employee[property]); // e.g. Joe Bloggs
        
  }
  
}
