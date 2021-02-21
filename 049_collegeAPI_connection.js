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

  // call the api function
  const response = UrlFetchApp.fetch(url + page + '&api_key=' + API_KEY);
  console.log(response.getResponseCode()); // 200 means ok

  // get the data
  const data = JSON.parse(response.getContentText());
  console.log(data.metadata); // { total: 3203, page: 0, per_page: 20 }

}