/**
 * function to append a row of data to the sheet
 */
function appendRow() {
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Stocks');

  // get hold of existing data
  const data = sheet.getRange(2,1,1,7).getValues();
  console.log(data[0]);

  // add to the sheet
  sheet.appendRow(data[0]);

  // grabs the last row as an integer
  const lastRow = sheet.getLastRow();

  // format the numbers in the last row
  sheet.getRange(lastRow,2,1,6).setNumberFormat('$#,###');
}