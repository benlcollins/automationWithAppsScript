/**
 * function to add custom menu
 */
function onOpen() {
  SpreadsheetApp.getUi() 
      .createMenu('Template Generator')
      .addItem('Show sidebar', 'showSidebar')
      .addToUi();
}

/**
 * function to show sidebar
 */
function showSidebar() {

  /* const html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Template Generator'); */

  const html = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate()
    .setTitle('Template Generator');
  
  SpreadsheetApp.getUi() 
      .showSidebar(html);

}

/**
 * function to create the template
 */
function createTemplate(formObject) {

  //{projectName=test} 
  const projectName = formObject.projectName;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  sheet.getRange(1,1).setValue(projectName);

}

/**
 * helper function to include HTML template code
 */
function include(filename) {

  return HtmlService.createHtmlOutputFromFile(filename).getContent();

}
