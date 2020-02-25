import { AUTH_SCOPES } from './constants';

export const generateAuthorizationUrl = redirectURI => api => {
  api.setRedirectURI(redirectURI);

  const url = api.createAuthorizeURL(AUTH_SCOPES, 'null', false);

  return url;
};
