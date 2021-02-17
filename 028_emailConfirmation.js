/**
 * onOpen to add custom menu
 */
function onOpen() {

  const ui = SpreadsheetApp.getUi();

  ui.createMenu('Save Data')
    .addItem('Save Row Of Data','appendRow')
    .addItem('Backup Data','backupData')
    .addToUi(); 

}


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


/**
 * function to backup the data to a separate Sheet
 */
function backupData() {

  // get name of the Sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const spreadsheetName = ss.getName();

  // determine if backup sheet exists???
  const backupSheets = DriveApp.getFilesByName('Backup of ' + spreadsheetName);

  // check if the backup sheet exists already
  if (backupSheets.hasNext()) {

    // backup sheet exists already, add new data to it
    console.log('Sheet already exists, so let\'s add data to it');

    // loop over the file iterator
    while (backupSheets.hasNext()) {

      // get the backup file
      const backupFile = backupSheets.next();
      
      // open the backup file
      const backupSpreadsheet = SpreadsheetApp.open(backupFile);

      // get the backup sheet
      const backupSheet = backupSpreadsheet.getSheetByName('Stocks');

      // find the last row of data in the backup sheet
      const backupRowCount = backupSheet.getLastRow();
      console.log(backupRowCount);

      // get the original sheet
      const origSheet = ss.getSheetByName('Stocks');
      const origSheetRowCount = origSheet.getLastRow();

      if (origSheetRowCount > backupRowCount) {
      
        // find any "fresh" data
        const freshData = origSheet.getRange(backupRowCount + 1,1,origSheetRowCount - backupRowCount, origSheet.getLastColumn()).getValues();
        console.log(freshData);

        // paste the "fresh" data into the backup sheet
        backupSheet.getRange(backupRowCount + 1,1,freshData.length,freshData[0].length).setValues(freshData);

        // send the confirmation email re backup
        confirmBackup(backupSpreadsheet.getName(),backupSpreadsheet.getUrl(),freshData.length + ' rows of data added.');

      }

    }

  }
  else {

    // backup sheet does not exist yet
    console.log('No backup Sheet yet, so create one!');

    // create a backup of the Sheet
    const backupSpreadsheet = ss.copy('Backup of ' + spreadsheetName);

    // send the confirmation email re backup
    confirmBackup(backupSpreadsheet.getName(),backupSpreadsheet.getUrl(),'Backup sheet created.');
  }
  
}

/**
 * send an email when the backup function runs
 */
function confirmBackup(name, url, message) {

  //console.log(name);
  //console.log(url);
  //console.log(message);

  const d = new Date();

  GmailApp.sendEmail('name@example.com',name + ' completed at ' + d.toString(),message + ' ' + url);

}
