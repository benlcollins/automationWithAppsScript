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
  if (responseCode === 200) {

    // 200 response code. Everything ok!
    const data = JSON.parse(response.getContentText());
    //console.log(data);

    // grab the data
    const name = data.name;
    const stats = data.stats;
    const memberCount = stats.member_count;
    const openRate = stats.open_rate;
    const clickRate = stats.click_rate;

    // create new timestamp
    const d = new Date();

    // append into our Google Sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.appendRow([
      d,
      name,
      memberCount,
      openRate,
      clickRate
    ]);

  }
  else {

    // report error code
    console.log('Error: ' + responseCode);
    console.log(response.getContentText());

  }

}
