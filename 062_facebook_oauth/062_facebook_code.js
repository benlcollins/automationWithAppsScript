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
  
  // setup the API url
  const base = 'https://graph.facebook.com/v9.0/';
  const endpoint = 'me?fields=id,name,location';
  const url = base + endpoint;
  console.log(url);
  
  // setup the advanced parameters for UrlFetchApp
  const params = {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }
  
  // call the api
  const response = UrlFetchApp.fetch(url, params);  
  
  // parse the JSON string to turn into Javascript object
  const data = JSON.parse(response);
  
  // call the function to paste into sheets
  toSheet(data); 

}


/**
 * function to paste data into Sheets
 */
function toSheet(data) {
  
  const id = data.id;
  const name = data.name;
  const location = data.location.name;
  const row = [id, name, location];
  
  // get the sheet and add row of FB data
  SpreadsheetApp.getActiveSheet().appendRow(row);
  
}
