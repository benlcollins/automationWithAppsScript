/**
 * custom menu
 */
function onOpen() {
  
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Import CSV From Gmail')
    .addItem('Import from Gmail...', 'importCSVFromGmail')
    .addToUi();
  
}

/**
 * import CSV data directly from gmail attachments
 */
function importCSVFromGmail() {

  // find emails with CSV files
  // get the threads that match this search
  //const threads = GmailApp.search('from:ben@benlcollins.com has:attachment filename:*.csv newer_than:1d');

  const threads = GmailApp.search('subject:Automatic CSV Import newer_than:1d');
  console.log(threads);
  Logger.log(threads); // [GmailThread]

  // loop over the threads returned by the search
  threads.forEach(thread => {

    // get the messages in a thread
    const messages = thread.getMessages();

    // loop over messages
    messages.forEach(message => {
        
      Logger.log(message.getSubject());

      // extract the attachments from the emails
      // An array of Blob attachments for this message.
      const attachments = message.getAttachments();
      //Logger.log(attachments.length);

      // loop over attachments
      attachments.forEach(attachment => {

        // check attachment is CSV
        if (attachment.getContentType() === 'text/csv') {

          // extract the data
          const csvData = Utilities.parseCsv(attachment.getDataAsString());
          console.log(csvData);

          // paste the data into Google Sheet
          const sheet = SpreadsheetApp.getActiveSheet();
          const lastRow = sheet.getLastRow();
          sheet.getRange(lastRow+1,1,csvData.length,csvData[0].length).setValues(csvData);

        }
        // deal with csv issue for windows users
        else if (attachment.getContentType() === 'application/vnd.ms-excel' || attachment.getContentType() === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

          // remove the .xlsx or .xls 
          const resource = {title: file.getName().replace(/.xlsx?/, "")};

          // convert the excel file to a new Google Sheet
          Drive.Files.insert(
            resource, 
            attachment, 
            {
              convert: true // convert this file to the corresponding Sheets format
            }
          );

          // extra steps could be to then copy this data from this newly created Sheet into this Sheet
          // then delete the created sheet

        }
        // catch if any other error
        else {
          console.log('Attachment not imported. File was some other type: ' + typeof attachment);
        }
      });
    });
  });
}