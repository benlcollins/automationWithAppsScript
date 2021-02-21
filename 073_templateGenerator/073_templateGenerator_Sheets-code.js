/**
 * create a copy of the Sheet template
 */
function createSheetCopy(projectName,folder,clientName,clientAddress,contactName,contactPhone,contactEmail) {

  // get the spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  // get the original spreadsheet file from Drive
  const originalTemplate = DriveApp.getFileById(ss.getId());

  // create a new name for the copy
  const newTemplateName = 'Project Template - ' + projectName;

  // make the copy of the template
  const newSsCopy = originalTemplate.makeCopy(newTemplateName, folder);

  // get the ID of the new copy and open it 
  const newSsCopyId = newSsCopy.getId();
  const ssNew = SpreadsheetApp.openById(newSsCopyId);
  const sheetNew = ssNew.getSheetByName('Sheet1');

  // set the value in the new Sheet
  sheetNew.getRange(4,2).setValue(projectName);
  sheetNew.getRange(5,2).setValue(clientName);
  sheetNew.getRange(6,2).setValue(clientAddress);
  sheetNew.getRange(7,2).setValue(contactName);
  sheetNew.getRange(8,2).setValue(contactPhone);
  sheetNew.getRange(9,2).setValue(contactEmail);

}