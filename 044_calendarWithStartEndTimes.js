/**
 * add multiple items to calendar with options
 */
function sheetsToCalendarAdvanced() {
  
  // get the data from the spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');
  const data = sheet.getDataRange().getValues();
  
  // remove the header row
  data.shift();
  
  // get the calendar
  const cal = CalendarApp.getCalendarById('name@example.com');
  
  // loop over the rows of data and create calendar events
  data.forEach( row => {
    
    // get data
    const eventDate = row[0];
    const eventTitle = row[1];
    const eventDescription = row[2];
    const eventDuration = row[3];
    const eventInvites = row[4];
    const eventLocation = row[5];
    
    const options = {
      description: eventDescription,
      location: eventLocation,
      guests: eventInvites,
      sendInvites: true
    };
    
    // add events to calendar
    // determine if all day event or event with start/end time
    if (eventDuration === 'All day') {
      // all day
      cal.createAllDayEvent(eventTitle, eventDate, options);
      
    }
    else {
      
      console.log(eventDate);
      
      // write a function to create a new end date
      const eventEndDate = createEndDate(eventDate, eventDuration);
      console.log(eventEndDate);
      
      cal.createEvent(eventTitle, eventDate, eventEndDate, options)
      
    }   
  }); 
}

/**
 * helper function to create a new end date based on start time and duration
 */
function createEndDate(startTime, duration) {
  
  // create the new datetime object
  const endTime = new Date(startTime);
  
  // calculate the duration as separate hours and minutes components
  const hrs = Math.floor(duration);
  const mins = (duration - hrs) * 60;
  
  // create new hours and new minutes for end time
  const newHours = endTime.getHours() + hrs;
  const newMins = endTime.getMinutes() + mins;
  
  // set the new hours and minutes
  endTime.setHours(newHours, newMins);
  
  // return the end time to the original function workflow
  return endTime;
  
}

