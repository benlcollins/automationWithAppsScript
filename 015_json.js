function jsonTest() {
  
  const data = {
    entry: {
      lesson: {
        title: 'JSON Introduction',
        description: 'JSON is a text-based data format following JavaScript object syntax',
        keywords: ['json', 'parse', 'string', 'object']
      }
    }
  }
  
  console.log(typeof data);
  //console.log(data.entry.lesson.keywords[2]); // string
  console.log(data.entry);
  
  // turn into a JSON string
  const payload = JSON.stringify(data);
  console.log(typeof payload);
  console.log(payload["entry"]);
  
  // convert JSON back to object
  const newData = JSON.parse(payload);
  console.log(typeof newData);
  console.log(newData.entry);
  
}