/** 
 * add custom menu to Sheet
 */
function onOpen() {

  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Product Feedback Tool')
    .addItem('Create draft emails', 'composeDraftReplies')
    .addItem('Drafts waiting for review?','draftsWaitingAlert')
    .addItem('Confirm emails sent','confirmEmailsSent')
    .addToUi();

}

/**
 * function to compose draft replies
 */
function composeDraftReplies() {

  // get data from sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Form Responses 1');
  const allRange = sheet.getDataRange();
  const allData = allRange.getValues();

  // add a row number to each row array
  allData.forEach((row,i) => row.push(i + 1));

  // remove the header row
  allData.shift();

  // filter out the rows of data where we have already sent the email
  // filter creates new array with values that pass the test
  const newData = allData.filter(row => row[4] === '');

  // loop over all the rows
  newData.forEach((row,i) => {

    //if (row[4] === '') {
      
      // get data
      const dateSubmitted = row[0];
      const email = row[1];
      const name = row[2];
      const feedback = row[3];
      const rowPosition = row[6];

      // create a draft email for each row
      createDraftEmail(dateSubmitted,email,name,feedback);

      // add a date to confirm when draft email was created
      const d = new Date();
      sheet.getRange(rowPosition,5).setValue(d);

    //}
  });
}

/**
 * creates a draft email
 */
function createDraftEmail(date,email,name,feedback) {

  // create subject line
  const subjectLine = 'Thanks for your feedback on ' + date;

  // create email body
  const htmlBody = 'Hi ' + name + `,<br><br>
    Thanks for responding to our product feedback questionnaire<br><br>
      It's really useful to us to help us improve this product.<br><br>
        Have a great day!<br><br>
          Thanks,<br>
            Product Team<br><br>
              <em>Your feedback:<br><br>`
                + feedback + '</em>';

  // create draft email
  GmailApp.createDraft(email, subjectLine, '', {htmlBody: htmlBody});
}

/**
 * Send alert when draft emails are waiting for review
 */
function draftsWaitingAlert() {

  // get data from sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Form Responses 1');
  const allRange = sheet.getDataRange();
  const allData = allRange.getValues();

  // remove the header row
  allData.shift();

  // create draft counter and set to 0
  let draftCounter = 0;

  allData.forEach(row => {

    console.log(row);

    if (row[5] === '') {
      
      // increment draft counter by 1
      draftCounter++;

    }

  });

  // test if draft counter > 0
  // if counter > 0, send an email to say we have drafts
  if (draftCounter > 0) {

    const htmlBody = 'You have ' + draftCounter + ` draft emails waiting for review.<br><br>
      To see all feedback, <a href="XXXXXXXXXXXXXXXXXXX">click here</a>.`;

    GmailApp.sendEmail('name@example.com',
      'You have ' + draftCounter + ' draft emails!',
      '',
      {
        htmlBody: htmlBody
      });

  }
  // else if counter = 0, send email to say we have NO drafts
  else {

    const htmlBody = `You have no draft emails waiting for review.<br><br>
      To see all feedback, <a href="XXXXXXXXXXXXXXXXXXX">click here</a>.`;

    GmailApp.sendEmail('name@example.com',
      'You have no draft emails!',
      '',
      {
        htmlBody: htmlBody
      });

  }

}

