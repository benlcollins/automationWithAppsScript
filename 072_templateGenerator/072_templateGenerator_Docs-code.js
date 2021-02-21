/**
 * function to generate copy of the contract template
 */
function createContractTemplate(projectName,folder,clientName,clientAddress,contactName,contactPhone,contactEmail) {

  // get the original template ID
  const docTemplateID = 'XXXXXXXXXXXXXXXX';

  // make a copy of the template in the new folder
  const contract = DriveApp.getFileById(docTemplateID).makeCopy('New Contract - ' + projectName, folder);

  // open the Doc file
  const doc = DocumentApp.openById(contract.getId());

  // get the body text
  const body = doc.getBody();

  // replace the placeholders
  body.replaceText("{{PROJECT_NAME}}", projectName);
  body.replaceText("{{CLIENT_NAME}}", clientName);
  body.replaceText("{{CLIENT_ADDRESS}}", clientAddress);
  body.replaceText("{{CONTACT_NAME}}", contactName);
  body.replaceText("{{CONTACT_PHONE}}", contactPhone);
  body.replaceText("{{CONTACT_EMAIL}}", contactEmail);

  // save
  doc.saveAndClose();

}
