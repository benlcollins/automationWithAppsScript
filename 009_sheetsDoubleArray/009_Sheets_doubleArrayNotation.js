function getRangeOfData() {
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Second Sheet');
  
  const range = sheet.getRange('A1:A5');
  const data = range.getValues();
  
  console.log(data);
  
  /*
  
  [ [Column 1, Column 2, Column 3], 
    [North, A, 7.0], 
    [South, B, 15.0], 
    [East, C, 4.0], 
    [West, D, 16.0]                ]
  
  
  [ [Column 1], 
    [North], 
    [South], 
    [East], 
    [West]      ]
  
  */
}