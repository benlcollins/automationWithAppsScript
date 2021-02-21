/**
 * create a copy of the Sheet template
 */
function createSheetCopy(projectName, folder) {

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
  sheetNew.getRange(1,1).setValue(projectName);

}