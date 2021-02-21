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

  // get Form data
  const projectName = formObject.projectName;
  const generateContract = formObject.generateContract;

  // create a new folder in Drive for the template copies
  const newClientFolder = DriveApp.createFolder('New Folder - ' + projectName);

  if (generateContract === 'on') {

    // call contract template function if user checks the box
    createContractTemplate(projectName, newClientFolder);

  }

  // create copy of the template
  createSheetCopy(projectName, newClientFolder);

}

/**
 * helper function to include HTML template code
 */
function include(filename) {

  return HtmlService.createHtmlOutputFromFile(filename).getContent();

}
