import SpotifyApi from 'spotify-web-api-node';
import { NO_CONTENT } from 'http-status-codes';
import { path } from 'ramda';
import { getSpotifyConfig } from './accessors';
import { AUTH_SCOPES } from './constants';
import tokenFacade from './facades/token';
import profileFacade from './facades/user';
import currentPlaybackFacade from './facades/currentPlayback';
import { gtNow } from '../../util/date';
import noop from '../../util/noop';
import { BadRequestError } from '../express/errors';

const isPrivateSession = path(['body', 'device', 'is_private_session']);

class SpotifyClient {
  constructor(oxi, { token = null, onTokenUpdate = noop } = {}) {
    this.config = oxi(getSpotifyConfig);
    this.token = token;
    this.onTokenUpdate = onTokenUpdate;

    const { clientId, clientSecret, redirectURL } = this.config;
    this.api = new SpotifyApi({
      clientId,
      clientSecret,
    });

    this.api.setRedirectURI(redirectURL);

    if (token) {
      this.setToken(token);
    }
  }

  _onTokenUpdate(token) {
    this.setToken(token);

    return this.onTokenUpdate(token);
  }

  generateAuthorizeURL({ userId }) {
    return this.api.createAuthorizeURL(AUTH_SCOPES, userId);
  }

  async fetchTokenByCode(code) {
    return this.api.authorizationCodeGrant(code).then(tokenFacade);
  }

  async refreshAccessToken(code) {
    return this.api.refreshAccessToken(code).then(tokenFacade);
  }

  async fetchMe() {
    return this.api.getMe().then(profileFacade);
  }

  async fetchCurrentPlayback() {
    const response = await this.api.getMyCurrentPlaybackState();

    if (response.statusCode === NO_CONTENT || isPrivateSession(response)) {
      return null;
    }

    return currentPlaybackFacade(response);
  }

  get isTokenValid() {
    return gtNow(this.token.expiresAt);
  }

  async ensureTokenIsValid() {
    if (!this.token) {
      throw new BadRequestError('manual auth required');
    }

    if (!this.isTokenValid) {
      const newToken = await this.refreshAccessToken();
      await this._onTokenUpdate(newToken);
    }
  }

  async getCurrentState() {
    await this.ensureTokenIsValid();

    const state = await this.fetchCurrentPlayback();

    if (!state) {
      return null;
    }

    return {
      ...state.entry,
      item: state.item,
      artists: state.artists,
      device: state.device,
      album: state.album,
    };
  }

  setToken({ accessToken, refreshToken }) {
    this.api.setAccessToken(accessToken);
    this.api.setRefreshToken(refreshToken);
  }
}

export default SpotifyClient;
