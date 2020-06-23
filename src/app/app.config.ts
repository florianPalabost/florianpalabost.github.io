export default {
  oidc: {
    clientId: '0oagrhgdn9flT4y9A4x6',
    issuer: `https://dev-953320.okta.com/oauth2/default`,
    redirectUri: 'http://localhost:4200/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    testing: {}
  },
  resourceServer: {
    messagesUrl: 'http://localhost:4200/api/messages'
  }
};
