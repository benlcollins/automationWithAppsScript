/*
 * call NASA Astronomy Photo of the Day API
 * send photo of the day to me via email
 */
function nasaPhoto() {
  
  // API Url
  const endpoint = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
  
  //fetch the data
  const response = UrlFetchApp.fetch(endpoint);
  const result = response.getContentText();
  
  // parse the data
  const data = JSON.parse(result);
  
  // get relevant data
  const explanation = data.explanation;
  const title = data.title;
  const image = data.url;
  
  // fetch the image and get as blob object
  const imageBlob = UrlFetchApp.fetch(image).getBlob();
  
  // create HTML body for email
  const body = '<img src="cid:nasaImage" /><br><br>' + explanation;
  
  // send email
  GmailApp.sendEmail(
    'name@example.com',
    'NASA Astronomy Photo of the Day: ' + title,
    '',
    {
      htmlBody: body,
      inlineImages: {
        nasaImage: imageBlob 
      }
    }
  );

}