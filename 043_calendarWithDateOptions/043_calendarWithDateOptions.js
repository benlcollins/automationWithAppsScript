/**
 * add multiple items to calendar with options
 */
function sheetsToCalendarAdvanced() {
  
  // get the data
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');
  const data = sheet.getDataRange().getValues();
  
  // remove the header row
  data.shift();
  
  // get the calendar
  const cal = CalendarApp.getCalendarById('name@example.com');
  
  // loop over the data rows
  data.forEach( row => {
    
    // get data
    const eventDate = row[0];
    const eventTitle = row[1];
    const eventDescription = row[2];
    const eventDuration = row[3];
    const eventInvites = row[4];
    
    const options = {
      description: eventDescription,
      guests: eventInvites,
      sendInvites: true
    };
    
    // determine if all day event or event with start/end time
    if (eventDuration === 'All day') {
      
      // all day events
      // add to the calendar
      cal.createAllDayEvent(eventTitle, eventDate, options);
      
    }
    else {
      
      // events with start/end time
      // add to the calendar
      
    }   
  }); 
}
