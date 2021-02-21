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
  const clientName = formObject.clientName;
  const clientAddress = formObject.clientAddress;
  const contactName = formObject.contactName;
  const contactPhone = formObject.contactPhone;
  const contactEmail = formObject.contactEmail;
  const date = createFormattedDate();

  // create a new folder in Drive for the template copies
  const newClientFolder = DriveApp.createFolder('New Folder - ' + projectName);

  // create copy of the template
  createSheetCopy(projectName,newClientFolder,clientName,clientAddress,contactName,contactPhone,contactEmail);

  // call contract template function if user checks the box
  if (generateContract === 'on') {
    createContractTemplate(projectName,newClientFolder,clientName,clientAddress,contactName,contactPhone,contactEmail,date);
  }

}

/**
 * helper function to include HTML template code
 */
function include(filename) {

  return HtmlService.createHtmlOutputFromFile(filename).getContent();

}

/**
 * helper function to format date
 */
function createFormattedDate() {

  // get timestamp now
  const d = new Date(); // Fri Feb 12 2021 11:02:37 GMT-0500 (Eastern Standard Time)

  // months array
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];

  // formatted date
  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();

}
