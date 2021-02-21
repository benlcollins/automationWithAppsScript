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
  //const query = '?school.degrees_awarded.predominant=2,3&fields=id,school.name,2018.student.size';
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
  const firstBatch = callCollegeScorecardAPI(url, 0, params);
  //console.log(firstBatch);

  // determine how many loops to do
  const loops = firstBatch.loops;
  console.log(loops);

  // array to hold college scorecard data
  // add the first batch to it
  let allCollegeData = firstBatch.data;
  //console.log(allCollegeData);

  // empty array to hold the next batch on each loop
  let nextBatch = [];

  // loop over the data, add to the array
  for (let i = 1; i < loops; i++) {

    // call the api function
    nextBatch = callCollegeScorecardAPI(url, i, params);
    console.log('loop ' + i);
    //console.log(nextBatch);

    // add next batch to the main array of data
    allCollegeData = allCollegeData.concat(nextBatch.data);

  }

  console.log(allCollegeData.length);

  // paste into the Google Sheet
  pasteCollegeDataToSheet(allCollegeData,'Sheet1');

}

/**
 * call the college scorecard api
 */
function callCollegeScorecardAPI(url, pageNum, params) {

  // current page number
  const page = '&page=' + pageNum;

  // call the api
  const response = UrlFetchApp.fetch(url + page + '&api_key=' + API_KEY,params);
  const responseCode = response.getResponseCode();
  const data = JSON.parse(response.getContentText());

  // metadata { total: 3203, page: 0, per_page: 20 }
  const metadata = data.metadata;
  const total = metadata.total;
  const loops = Math.ceil(total / 20); // 5 loops

  // create empty array to hold college data
  const collegeScores = [];

  if (responseCode === 200) {

    // process the data
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

    return {
      loops: loops,
      data: collegeScores
    };

  }
  else {

    // process the error message
    console.log('Error code: ' + responseCode);
    console.log(data);

  }
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
