import { Dropbox } from 'dropbox';
import { parseQueryString } from './utlis'

export const CLIENT_ID = process.env.REACT_APP_DROPBOX_TOKEN;;

const dbx = new Dropbox({  
  clientId: CLIENT_ID,
  fetch  
});

export let authlink = dbx.getAuthenticationUrl('http://localhost:3000/auth');
export let startButtonText = 'Start'

// Parses the url and gets the access token if it is in the urls hash
export const getAccessTokenFromUrl = () => {
 return parseQueryString(window.location.hash).access_token;
}

// If the user was just redirected from authenticating, the urls hash will
// contain the access token.
function isAuthenticated() {
  return !!getAccessTokenFromUrl();
}

if (!isAuthenticated()) {
  startButtonText = 'Connect to Dropbox'
}
