/**
 * Global Variables
 */
const API_KEY = 'XXXXXXXXXXXXXXX';

/**
 * function to call the Open Data Maker API
 */
function openDataCollegeScorecard() {

  // https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&fields=id,school.name,2013.student.size

  // setup the api url
  const root = 'https://api.data.gov/ed/collegescorecard';
  const endpoint = '/v1/schools.json';
  const query = '?school.degrees_awarded.predominant=2,3&fields=id,school.name,2013.student.size';

  const url = root + endpoint + query;
  //console.log(url + '&api_key=' + API_KEY);

  // use muteHttpExceptions option to examine full response
  // error code 400
  // create advanced params
  const params = {
    muteHttpExceptions: true
  };

  // call the api function
  const response = UrlFetchApp.fetch(url + page + '&api_key=' + API_KEY, params);
  const responseCode = response.getResponseCode();
  const data = JSON.parse(response.getContentText());

  if (responseCode === 200) {

    // process the data
    console.log(data);

  }
  else {

    // process the error message
    console.log('Error code: ' + responseCode);
    console.log(data);

  }

  // metadata
  // { total: 3203, page: 0, per_page: 20 }

}