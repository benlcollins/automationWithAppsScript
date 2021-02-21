/**
 * GLOBAL VARIABLES
 * client ID and client secret from paypal
 */
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
  const endpoint = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';

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
  const root = 'https://api-m.sandbox.paypal.com';
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
    console.log(responseCode);
    console.log(result);

  }
  //  handle any errors
  catch(e) {
    console.log('Error: ' + e);
  }
}
