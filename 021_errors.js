function saveData() {
  
  const sheet = SpreadsheetApp.getActiveSheet();
  
  const someValue = 42;
  const someNames = ['Anna','Simon','Chloe'];
  
  sheet.getRange(1,1).setValue(someValue);
  
  console.log([someNames]);
  
  try {
   
    // code to try running
    sheet.getRange(2,1,1,3).setValues([someNames]);
    
  }
  catch(error) {
    
    // code to execute if you encounter an error
    console.log(error);
    
  }
  
  console.log("Hello, program has finished!");
  
}
