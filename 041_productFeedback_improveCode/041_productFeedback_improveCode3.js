/**
 * confirm when draft emails are sent and record in Sheet
 */
function confirmEmailsSent() {
  
  // get data from sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Form Responses 1');
  const allRange = sheet.getDataRange();
  const allData = allRange.getValues();

  // remove the header row
  allData.shift();

  // loop over the data
  allData.forEach( (row,i) => {

    // check whether reply has been sent already
    if (row[5] === '') {

      console.log('Email not confirmed as sent yet!');
      console.log(i);

      // in:sent to:name@example.com subject:Thanks for your feedback on Thu Dec 24 2020 11:38:15 GMT-0500 (Eastern Standard Time) 
      const date = row[0];
      const email = row[1];
      const subjectLine = 'Thanks for your feedback on ' + date;

      // if not, search for the email in gmail sent folder
      const threads = GmailApp.search('in:sent to:' + email + ' subject:' + subjectLine);
      
      // if email is found in sent email folder, mark as sent in the Google Sheet
      if (threads.length > 0) {
        const d = new Date();
        sheet.getRange(i + 2, 6).setValue(d);
      }


    }
    else {

      // email has been sent
      console.log('Email already sent!');
      console.log(i);

    }
  });
}