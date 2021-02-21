/**
 * sending replies automatically from our google form
 */
function sendReplies() {

  // get data from sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Form Responses 1');
  const allRange = sheet.getDataRange();
  const allData = allRange.getValues();

  // remove the header row
  allData.shift();

  // loop over all the rows
  allData.forEach(row => {

    console.log(row); 

    // get data
    const dateSubmitted = row[0];
    const email = row[1];
    const name = row[2];
    const feedback = row[3];

    // send an email for each row
    sendEmail(dateSubmitted, email, name, feedback); 

  });

}


/**
 *  send an email with the feedback
 */
function sendEmail(date, email, name, feedback) {

  // create subject line
  const subjectLine = 'Thanks for your feedback!';

  // create email body
  const htmlBody = 'Hi ' + name + `,<br><br>
    Thanks for responding to our product feedback questionnaire<br><br>
      It's really useful to us to help us improve this product.<br><br>
        Have a great day!<br><br>
          Thanks,<br>
            Product Team`;

  // send email
  GmailApp.sendEmail(email,subjectLine,'',{htmlBody: htmlBody});
}

