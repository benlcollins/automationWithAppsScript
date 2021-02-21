/**
* Add custom menu to Google Sheet
*/
function onOpen() {
  
  SpreadsheetApp.getUi()
    .createMenu('PayPal App')
    .addItem('Import Transactions', 'pasteTransactionsIntoSheet')
    .addToUi();
  
}

/**
 * GLOBAL VARIABLES
 * client ID and client secret from paypal
 */
// SANDBOX
//const CLIENT_ID = 'XXXXXXXXXXXXXXXXX';
//const CLIENT_SECRET = 'XXXXXXXXXXXXXXXXX';

// LIVE
const CLIENT_ID = 'XXXXXXXXXXXXXXXXX';
const CLIENT_SECRET = 'XXXXXXXXXXXXXXXXX';

/*
curl -v https://api-m.sandbox.paypal.com/v1/oauth2/token \
  -H "Accept: application/json" \
  -H "Accept-Language: en_US" \
  -u "client_id:secret" \
  -d "grant_type=client_credentials"
*/

/**
* get access token request
*/
function getAccessToken() {

  // set up the url
  //const endpoint = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
  const endpoint = 'https://api-m.paypal.com/v1/oauth2/token';

  // set up the parameters
  const params = {
    headers: {
      'Accept': 'application/json',
      'Accept-Language': 'en_US',
      'Authorization': 'Basic ' + Utilities.base64Encode(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    method: 'post',
    payload: {
      'grant_type': 'client_credentials'
    },
    muteHttpExceptions: true
  }

  // call the url to fetch the access token
  const response = UrlFetchApp.fetch(endpoint, params);

  // parse the response and get the access token
  const result = JSON.parse(response.getContentText());
  //console.log(result);
  console.log(result.access_token);

  return result.access_token;

}


// Base 64 Example
function encodeTest() {
  
  console.log(CLIENT_ID + ':' + CLIENT_SECRET);
  console.log(Utilities.base64Encode(CLIENT_ID + ':' + CLIENT_SECRET));

}

/**
* get user info from paypal api
*/
function getUserInfo() {

  // get the access token
  const access_token = getAccessToken();

  // setup the endpoint
  //const root = 'https://api-m.sandbox.paypal.com';
  const root = 'https://api-m.paypal.com';
  const endpoint = '/v1/identity/oauth2/userinfo?schema=paypalv1.1';

  // setup the params
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    method: 'get',
    muteHttpExceptions: true
  }

  // try calling the api
  try {

    const response = UrlFetchApp.fetch(root + endpoint, params);
    // parse the data
    const responseCode = response.getResponseCode();
    const result = JSON.parse(response.getContentText());

    // log the results
    console.log(response);
    console.log(responseCode);
    console.log(result);

  }
  //  handle any errors
  catch(e) {
    console.log('Error: ' + e);
  }
}

/**
* get paypal transactions from paypal api
*/
function getTransactions() {

  // get the access token
  const access_token = getAccessToken();

  // setup the endpoint
  //const root = 'https://api-m.sandbox.paypal.com';
  const root = 'https://api-m.paypal.com';
  const endpoint = '/v1/reporting/transactions';
  const start_date = '2020-12-01T00:00:00-0700';
  const end_date = '2020-12-31T23:59:59-0700';
  const transactionEndpoint = root + endpoint + '?start_date=' + start_date + '&end_date=' + end_date;
  console.log(transactionEndpoint);

  // setup the params
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    method: 'get',
    muteHttpExceptions: true
  }

  // try calling the api
  try {

    const response = UrlFetchApp.fetch(transactionEndpoint, params);
    // parse the data
    const responseCode = response.getResponseCode();
    const result = JSON.parse(response.getContentText());

    // log the results
    console.log(responseCode);
    //console.log(result.transaction_details);

    return result;

  }
  //  handle any errors
  catch(e) {
    console.log('Error: ' + e);
  }
}


/**
* paste transaction data into Google Sheet
*/
function pasteTransactionsIntoSheet() {

  // get transaction data
  const transactionData = getTransactions().transaction_details;
  //console.log(transactionData[0]);

  // create empty array
  const allData = [];

  // loop over transaction data array
  transactionData.forEach(transaction => {

    // parse the data
    const transactionInfo = transaction.transaction_info;
    const transactionId = transactionInfo.transaction_id;
    const transactionCurrency = transactionInfo.transaction_amount.currency_code;
    const transactionValue = transactionInfo.transaction_amount.value;
    const transactionNote = transactionInfo.transaction_note ? transactionInfo.transaction_note : 'N/a';
    const transactionSubject = transactionInfo.transaction_subject ? transactionInfo.transaction_subject : 'N/a';
    const endingBalanceValue = transactionInfo.ending_balance.value;
    const transactionDate = transactionInfo.transaction_initiation_date;

    // push into an empty array
    // [[],[]]
    allData.push([
      transactionId,
      transactionDate,
      transactionCurrency,
      transactionValue,
      transactionNote,
      transactionSubject,
      endingBalanceValue
    ]);

  });
  console.log(allData);

  // get the Sheet
  const sheet = SpreadsheetApp.getActiveSheet();

  // paste in the data
  sheet.getRange(sheet.getLastRow()+1,1,allData.length,allData[0].length).setValues(allData);

}