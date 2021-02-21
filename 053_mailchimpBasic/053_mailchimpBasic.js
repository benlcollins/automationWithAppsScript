/**
 * GLOBAL VARIABLES
 */
const LIST_ID = 'XXXXXXXXXXX';
const API_KEY = 'XXXXXXXXXXX';

/** 
 * function to call MailChimp API
 */
function mailChimpEndpoint() {

  // set up the url to call
  const root = 'https://us11.api.mailchimp.com/3.0';
  const endpoint = '/lists/' + LIST_ID;
  console.log(root + endpoint);

  // set up the authentication parameters
  const params = {
    headers: {
      Authorization: 'anystring ' + API_KEY
    },
    muteHttpExceptions: true
  };

  // call the mailchimp api
  const response = UrlFetchApp.fetch(root + endpoint, params);

  // get the response code
  const responseCode = response.getResponseCode();
  console.log(responseCode);

  // parse the data
  const data = response.getContentText();
  console.log(data);

}
