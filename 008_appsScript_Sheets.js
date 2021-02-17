function getData() {
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  const thing = sheet.getRange(1,1).getValue(); // Ben
  const anotherThing = sheet.getRange(3,4).getValue(); // Anna
  
  console.log(thing);
  console.log(anotherThing);
  
}