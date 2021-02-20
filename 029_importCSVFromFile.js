/**
 * custom menu
 */
function onOpen() {
  
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Import CSV')
    .addItem('Import from file...', 'importCSVFromFile')
    .addToUi();
  
}


/**
 * Import CSV data from individual file
 */
function importCSVFromFile() {

  // get hold of the CSV file
  const fileName = 'testing_csv_1.csv';
  const file = DriveApp.getFilesByName(fileName).next();

  // get the data
  const dataBlob = file.getBlob();
  const csvString = dataBlob.getDataAsString();
  const csvData = Utilities.parseCsv(csvString);
  console.log(csvData);

  // paste it into our Google Sheet
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1,1,csvData.length,csvData[0].length).setValues(csvData);

}