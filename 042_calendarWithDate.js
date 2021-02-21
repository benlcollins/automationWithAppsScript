// function to get data from Google Sheet and add to Calendar
function sheetsToCalendarMultiple() {
  
  // get the relevant data from Google Sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
  
  // get the calendar
  const cal = CalendarApp.getCalendarById('name@example.com');
  
  // loop over the data and add calendar items
  data.forEach( row => {
    
    const eventDate = row[0];
    const eventTitle = row[1];
    
    // add event to the calendar
    cal.createAllDayEvent(eventTitle, eventDate);
    
  });
}




// function to get data from Google Sheet and add to Calendar
function sheetsToCalendarSimple() {
  
  // get the relevant data from Google Sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');
  const data = sheet.getRange(2, 1, 1, 2).getValues();
  const eventDate = data[0][0];
  const eventTitle = data[0][1];
  
  // get the calendar
  const cal = CalendarApp.getCalendarById('name@example.com');
  
  // add event to the calendar
  cal.createAllDayEvent(eventTitle, eventDate);
  
}
