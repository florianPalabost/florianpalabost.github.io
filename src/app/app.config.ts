import { environment } from 'src/environments/environment';

export default {
  oidc: {
    clientId: environment.client_id || '',
    issuer: `https://${environment.issuer}.okta.com/oauth2/default`,
    redirectUri: environment.redirectUri,
    scopes: ['openid', 'profile', 'email'],
    testing: {}
  },
  resourceServer: {
    messagesUrl: 'http://localhost:4200/api/messages'
  }
};
