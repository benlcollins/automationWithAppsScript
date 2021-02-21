/**
 * custom menu
 */
function onOpen() {
  
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Import CSV')
    .addItem('Import from file...', 'importCSVFromFile')
    .addItem('Import from folder...','importCSVFromFolder')
    .addToUi();
  
}


/**
 * extract csv data from any files in a named Drive folder
 */
function importCSVFromFolder() {

  // find the folder with the CSVs
  const folder = DriveApp.getFolderById('16MhsGFia-WMhzHkOO5W8QgjVSObu9bn4');

  // extract the CSV files
  const csvFiles = folder.getFilesByType(MimeType.CSV); // FileIterator
  Logger.log(csvFiles.hasNext()); 

  // loop over file iterator whilst it still has another file in
  while (csvFiles.hasNext()) {

    // extract the data from file
    const file = csvFiles.next();
    importCSVFromFile(file);

  }
}

/**
 * Import CSV data from individual file
 */
function importCSVFromFile(file) {

  // check whether file variable exists
  // if no file variable, then prompt user for one
  if (typeof file === 'undefined') {

    // get hold of the CSV file
    //const fileName = 'testing_csv_1.csv';

    // prompt user for filename
    const ui = SpreadsheetApp.getUi();
    const result = ui.prompt('Enter CSV filename:'); // PromptResponse
    const fileName = result.getResponseText();

    // get the file
    file = DriveApp.getFilesByName(fileName).next();

  }

  // get the data
  const dataBlob = file.getBlob();
  const csvString = dataBlob.getDataAsString();
  const csvData = Utilities.parseCsv(csvString);

  // remove the header row
  csvData.shift();
  console.log(csvData);

  // paste it into our Google Sheet
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1,1,csvData.length,csvData[0].length).setValues(csvData);

}
