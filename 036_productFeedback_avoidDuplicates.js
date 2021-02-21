/** 
 * add custom menu to Sheet
 */
function onOpen() {

  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Product Feedback Tool')
    .addItem('Create draft emails', 'composeDraftReplies')
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

  // remove the header row
  allData.shift();

  // loop over all the rows
  allData.forEach((row,i) => {
      
      //console.log(row);
      
      if (row[4] === '') {
      
        // get data
        const dateSubmitted = row[0];
        const email = row[1];
        const name = row[2];
        const feedback = row[3];
        
        // create a draft email for each row
        createDraftEmail(dateSubmitted,email,name,feedback);

        // add a date to confirm when draft email was created
        const d = new Date();
        sheet.getRange(i + 2,5).setValue(d);

      }
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

