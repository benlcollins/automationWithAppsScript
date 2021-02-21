/** 
 * function to call the Numbers API
 */
function callNumbers() {
  
  // endpoint
  const endpoint = 'http://numbersapi.com/random/math';
  
  // call the numbers API to get random math fact
  const response = UrlFetchApp.fetch(endpoint);
  const result = response.getContentText();
  
  // paste result into Google Sheet
  const sheet = SpreadsheetApp.getActiveSheet();
  //sheet.getRange(1,1).setValue(result);
  sheet.appendRow([result]);
  
}
