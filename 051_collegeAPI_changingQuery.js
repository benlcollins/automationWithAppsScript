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
  //const query = '?school.degrees_awarded.predominant=2,3&fields=id,school.name,2013.student.size';
  const query = '?school.city=new%20york&fields=id,school.name,latest.student.size,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state';

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

  // create empty array to hold college data
  const collegeScores = [];

  if (responseCode === 200) {

    // process the data
    //console.log(data);

    const results = data.results;

    // loop over the results
    results.forEach(row => {
      
      // get the data elements for each college
      const id = row.id;
      const name = row['school.name']; // have to use square bracket notation
      const size = row['latest.student.size'];
      const inStateTuition = row['latest.cost.tuition.in_state'];
      const outOfStateTuition = row['latest.cost.tuition.out_of_state'];

      // push them into the array for our Sheet
      collegeScores.push([id, name, size, inStateTuition, outOfStateTuition]);

    });

    console.log(collegeScores);
    pasteCollegeDataToSheet(allCollegeData,'Sheet1');

  }
  else {

    // process the error message
    console.log('Error code: ' + responseCode);
    console.log(data);

  }

  // metadata
  // { total: 3203, page: 0, per_page: 20 }

}

/**
 * function to paste array into Google Sheets
 */
function pasteCollegeDataToSheet(arr,sheetName) {

  // get the Sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  // get the range
  // paste in the data
  sheet.getRange(2,1,arr.length,arr[0].length).setValues(arr);

}