/**
 * Custom menu to use tool from Sheet UI
 */
function onOpen() {
  
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('Facebook Import Tool')
    .addItem('Run Facebook Tool', 'showSidebar')
    .addToUi();
  
}


/**
 * function to get Facebook Data
 */
function makeRequest() {
  
  // get the Facebook Service
  const facebookService = getFacebookService();
  
  // get the access token
  const access_token = facebookService.getAccessToken();
  console.log(access_token);
  // SpreadsheetApp.getActiveSheet().getRange(1,1).setValue(access_token);
  

}