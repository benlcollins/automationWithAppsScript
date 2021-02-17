// Better way of doing things
function getDataBetter() {
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getRange(2,1,100,1).getValues();
  const answer = [];
  
  for (let i = 0; i < 100; i++) {
  
    //console.log(data[i]); // row
    //console.log(data[i][0] + 1); // item
  
    answer.push([ data[i][0] + 1 ]);
  }
  console.log(answer);
  
  sheet.getRange(2,2,100,1).setValues(answer);
}




// inefficient function. Bad practice
function getDataBad() {
  
  const sheet = SpreadsheetApp.getActiveSheet();
  let data, answer;
  
  for (let i = 0; i < 100; i++) {
    
    data = sheet.getRange(i + 2, 1).getValue();
    console.log(data);
    
    answer = data + 1;
    console.log(answer);
    
    sheet.getRange(i + 2, 2).setValue(answer);
    
  }
  
}
