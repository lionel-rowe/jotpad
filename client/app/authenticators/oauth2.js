// import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

// export default OAuth2PasswordGrant.extend();

import ENV from '../config/environment';

import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

const serverTokenPath = '/oauth/token';
const serverTokenEndpoint = ENV.API_HOST
  ? ENV.API_HOST + serverTokenPath
  : serverTokenPath;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint
});
