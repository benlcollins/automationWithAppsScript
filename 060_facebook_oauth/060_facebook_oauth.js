/**
 * Global variables
 */
const CLIENT_ID = 'XXXXXXXXXXXXXXX'; 
const CLIENT_SECRET = 'XXXXXXXXXXXXXXX';
const REDIRECT_URL = 'XXXXXXXXXXXXXXX'; 

/**
 * Create the OAuth2 service
 */
function getFacebookService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('facebook')

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl('https://www.facebook.com/v9.0/dialog/oauth')
      .setTokenUrl('https://graph.facebook.com/v9.0/oauth/access_token')

      // Set the client ID and secret, from the Google Developers Console.
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope('');
}
