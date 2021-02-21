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

  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Template Generator');
  
  SpreadsheetApp.getUi() 
      .showSidebar(html);

}
